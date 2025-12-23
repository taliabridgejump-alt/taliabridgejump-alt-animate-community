import React, { useState, useEffect } from 'react';
import { FaPlus, FaPlay, FaSave, FaDownload } from 'react-icons/fa';
import { projectService } from '../services/projectService';
import { voiceForgeService } from '../services/voiceForgeService';

const VideoMaker = () => {
  const [project, setProject] = useState({
    title: 'Untitled Project',
    characters: [],
    scenes: []
  });
  const [selectedScene, setSelectedScene] = useState(null);
  const [voices, setVoices] = useState([]);
  const [characterUrl, setCharacterUrl] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadVoices();
  }, []);

  const loadVoices = async () => {
    try {
      const voiceList = await voiceForgeService.getVoices();
      setVoices(voiceList);
    } catch (err) {
      console.error('Failed to load voices:', err);
    }
  };

  const addCharacter = () => {
    if (!characterUrl.trim()) return;
    
    const newCharacter = {
      id: Date.now().toString(),
      name: `Character ${project.characters.length + 1}`,
      imageUrl: characterUrl,
      position: { x: 0, y: 0 }
    };
    
    setProject({
      ...project,
      characters: [...project.characters, newCharacter]
    });
    setCharacterUrl('');
  };

  const addScene = () => {
    const newScene = {
      id: Date.now().toString(),
      duration: 5,
      characters: [],
      voiceover: { text: '', voice: 'eric', audioUrl: '' },
      background: '#ffffff'
    };
    
    setProject({
      ...project,
      scenes: [...project.scenes, newScene]
    });
    setSelectedScene(newScene.id);
  };

  const updateScene = (sceneId, updates) => {
    setProject({
      ...project,
      scenes: project.scenes.map(scene =>
        scene.id === sceneId ? { ...scene, ...updates } : scene
      )
    });
  };

  const generateVoiceover = async (sceneId) => {
    const scene = project.scenes.find(s => s.id === sceneId);
    if (!scene || !scene.voiceover.text) return;

    try {
      const result = await voiceForgeService.generateSpeech(
        scene.voiceover.text,
        scene.voiceover.voice
      );
      updateScene(sceneId, {
        voiceover: {
          ...scene.voiceover,
          audioUrl: result.audioUrl
        }
      });
    } catch (err) {
      console.error('Failed to generate voiceover:', err);
    }
  };

  const saveProject = async () => {
    setSaving(true);
    try {
      await projectService.createProject(project);
      alert('Project saved successfully!');
    } catch (err) {
      console.error('Failed to save project:', err);
      alert('Failed to save project');
    } finally {
      setSaving(false);
    }
  };

  const currentScene = project.scenes.find(s => s.id === selectedScene);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Toolbar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={project.title}
              onChange={(e) => setProject({ ...project, title: e.target.value })}
              className="text-xl font-bold border-none focus:outline-none focus:ring-2 focus:ring-purple-500 px-2 py-1 rounded"
            />
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={saveProject}
              disabled={saving}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
            >
              <FaSave />
              <span>{saving ? 'Saving...' : 'Save'}</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
              <FaPlay />
              <span>Preview</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              <FaDownload />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Left Sidebar - Assets */}
        <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Characters</h3>
            
            <div className="mb-4">
              <input
                type="text"
                placeholder="Image URL"
                value={characterUrl}
                onChange={(e) => setCharacterUrl(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
              />
              <button
                onClick={addCharacter}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                <FaPlus />
                <span>Import Character</span>
              </button>
            </div>

            <div className="space-y-2">
              {project.characters.map((character) => (
                <div
                  key={character.id}
                  className="p-2 border border-gray-200 rounded cursor-pointer hover:bg-gray-50"
                >
                  <img
                    src={character.imageUrl}
                    alt={character.name}
                    className="w-full h-20 object-contain mb-2"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect fill="%23ddd" width="100" height="100"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="12" dy="3.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
                    }}
                  />
                  <p className="text-sm text-center">{character.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 flex flex-col">
          {/* Canvas */}
          <div className="flex-1 bg-gray-100 p-8 overflow-auto">
            <div className="bg-white rounded-lg shadow-lg mx-auto" style={{ width: '800px', height: '450px' }}>
              {currentScene ? (
                <div
                  className="w-full h-full relative"
                  style={{ backgroundColor: currentScene.background }}
                >
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    Scene Canvas
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <p>Add a scene to start creating</p>
                </div>
              )}
            </div>
          </div>

          {/* Timeline */}
          <div className="h-48 bg-white border-t border-gray-200 overflow-x-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Timeline</h3>
                <button
                  onClick={addScene}
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                >
                  <FaPlus />
                  <span>Add Scene</span>
                </button>
              </div>
              
              <div className="flex space-x-2">
                {project.scenes.map((scene, index) => (
                  <div
                    key={scene.id}
                    onClick={() => setSelectedScene(scene.id)}
                    className={`min-w-32 h-20 border-2 rounded cursor-pointer flex items-center justify-center ${
                      selectedScene === scene.id
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-300 bg-white hover:border-purple-400'
                    }`}
                  >
                    <div className="text-center">
                      <p className="text-sm font-medium">Scene {index + 1}</p>
                      <p className="text-xs text-gray-500">{scene.duration}s</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Properties */}
        <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
          <div className="p-4">
            {currentScene ? (
              <>
                <h3 className="text-lg font-semibold mb-4">Scene Properties</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration (seconds)
                    </label>
                    <input
                      type="number"
                      value={currentScene.duration}
                      onChange={(e) => updateScene(currentScene.id, { duration: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      min="1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Background Color
                    </label>
                    <input
                      type="color"
                      value={currentScene.background}
                      onChange={(e) => updateScene(currentScene.id, { background: e.target.value })}
                      className="w-full h-10 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <h4 className="text-md font-semibold mb-2">Voiceover</h4>
                    
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Voice
                    </label>
                    <select
                      value={currentScene.voiceover.voice}
                      onChange={(e) => updateScene(currentScene.id, {
                        voiceover: { ...currentScene.voiceover, voice: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
                    >
                      {voices.map(voice => (
                        <option key={voice.id} value={voice.id}>
                          {voice.name} ({voice.gender})
                        </option>
                      ))}
                    </select>

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Text
                    </label>
                    <textarea
                      value={currentScene.voiceover.text}
                      onChange={(e) => updateScene(currentScene.id, {
                        voiceover: { ...currentScene.voiceover, text: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      rows="3"
                      placeholder="Enter voiceover text..."
                    />

                    <button
                      onClick={() => generateVoiceover(currentScene.id)}
                      className="w-full mt-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      Generate Voiceover
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center text-gray-400 mt-8">
                <p>Select a scene to edit its properties</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoMaker;
