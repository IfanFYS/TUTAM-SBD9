import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import noteService from '../services/noteService';

const NotesPage = () => {
  // Format the date nicely with time included
  const formatDate = (dateString) => {
    const options = { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  // Fetch notes
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const data = await noteService.getNotes();
        setNotes(data);
      } catch (error) {
        console.error('Error fetching notes:', error);
        toast.error('Failed to load notes');
      } finally {
        setLoading(false);
      }
    };
    
    fetchNotes();
  }, []);
  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error('Title is required');
      return;
    }
    
    try {
      if (editingNote) {
        // Update existing note
        const updatedNote = await noteService.updateNote(editingNote.id, {
          title,
          content
        });
        
        setNotes(notes.map(note => 
          note.id === editingNote.id ? updatedNote : note
        ));
        
        toast.success('Note updated successfully');
        setEditingNote(null);
      } else {
        // Create new note
        const newNote = await noteService.createNote({
          title,
          content
        });
        
        setNotes([newNote, ...notes]);
        toast.success('Note created successfully');
      }
      
      // Reset form
      setTitle('');
      setContent('');
      setIsExpanded(false);
    } catch (error) {
      console.error('Error saving note:', error);
      toast.error('Failed to save note');
    }
  };

  // Edit a note
  const handleEdit = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setIsExpanded(true);
    setEditingNote(note);
    window.scrollTo({top: 0, behavior: 'smooth'});
  };
  // Delete a note
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this note?')) return;
    
    try {
      await noteService.deleteNote(id);
      setNotes(notes.filter(note => note.id !== id));
      toast.success('Note deleted successfully');
      
      // Reset form if we were editing this note
      if (editingNote && editingNote.id === id) {
        setTitle('');
        setContent('');
        setIsExpanded(false);
        setEditingNote(null);
      }
    } catch (error) {
      console.error('Error deleting note:', error);
      toast.error('Failed to delete note');
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setTitle('');
    setContent('');
    setIsExpanded(false);
    setEditingNote(null);
  };

  // Filter notes based on search
  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">      <div className="flex items-center justify-center mb-8">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-primary-600 to-accent-500 text-white py-2 px-6 rounded-full inline-flex items-center shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <h1 className="text-xl font-bold">Note Master</h1>
        </motion.div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full py-2 px-4 rounded-lg border border-secondary-300 dark:border-secondary-600 bg-white dark:bg-secondary-800 text-secondary-900 dark:text-secondary-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <svg 
          className="absolute right-3 top-2.5 h-5 w-5 text-secondary-400" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>      {/* Note Form */}
      <motion.div 
        animate={{ 
          height: isExpanded ? 'auto' : 'auto',
          boxShadow: isExpanded ? '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)' : '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)'
        }}
        transition={{ duration: 0.3 }}
        className={`bg-white dark:bg-secondary-800 rounded-xl shadow-md border border-secondary-200 dark:border-secondary-700 transition-all duration-300 ${isExpanded ? 'p-6' : 'p-4'}`}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form Title */}
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <motion.div
                animate={{ rotate: isExpanded ? 45 : 0 }}
                transition={{ duration: 0.3 }}
                className="w-6 h-6 mr-2 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </motion.div>
              <h3 className="text-lg font-medium text-secondary-900 dark:text-secondary-100">
                {editingNote ? 'Edit Note' : 'Create New Note'}
              </h3>
            </div>
            {editingNote && (
              <motion.button
                type="button"
                onClick={handleCancel}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center text-secondary-500 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-200"
              >
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </motion.button>
            )}
          </div>
            {/* Title Input */}
          <div>
            <div className="relative">
              <input
                type="text"
                placeholder="Note title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onFocus={() => !isExpanded && setIsExpanded(true)}
                className="w-full px-4 py-2 rounded-lg border border-secondary-300 dark:border-secondary-600 bg-white dark:bg-secondary-800 text-secondary-900 dark:text-secondary-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300"
                required
              />
              {!isExpanded && (
                <div className="absolute right-3 top-2.5 text-sm text-secondary-500 dark:text-secondary-400 animate-pulse">
                  Click to add a note...
                </div>
              )}
            </div>
          </div>
            {/* Content Textarea - only show if expanded */}
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: isExpanded ? 1 : 0,
              height: isExpanded ? 'auto' : 0
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <textarea
              placeholder="Write your note content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-secondary-300 dark:border-secondary-600 bg-white dark:bg-secondary-800 text-secondary-900 dark:text-secondary-100 focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-[120px]"
              rows={5}
            />
          </motion.div>          {/* Submit Button - only show if expanded */}
          <motion.div 
            initial={{ opacity: 0, y: 10, height: 0 }}
            animate={{ 
              opacity: isExpanded ? 1 : 0,
              y: isExpanded ? 0 : 10,
              height: isExpanded ? 'auto' : 0
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="flex justify-end">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 focus:ring-offset-primary-200 text-white transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-md hover:shadow-lg flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {editingNote ? 'Update Note' : 'Save Note'}
              </motion.button>
            </div>          </motion.div>
        </form>
      </motion.div>

      {/* Notes List */}
      <div className="space-y-4 mt-8">        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-between items-center border-b border-secondary-200 dark:border-secondary-700 pb-2"
        >
          <h2 className="text-xl font-semibold text-secondary-800 dark:text-secondary-200 flex items-center">
            <svg className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            My Notes {notes.length > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-primary-100 dark:bg-primary-900/30 rounded text-primary-700 dark:text-primary-400 text-sm font-medium">
                {filteredNotes.length}
              </span>
            )}
          </h2>
          {notes.length > 0 && (
            <div className="text-sm text-secondary-500 dark:text-secondary-400 flex items-center">
              {searchQuery && (
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Showing {filteredNotes.length} of {notes.length}
                </span>
              )}
            </div>
          )}
        </motion.div>
        
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600"></div>
          </div>
        ) : filteredNotes.length > 0 ? (          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredNotes.map((note) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-secondary-800 rounded-xl shadow-md border border-secondary-200 dark:border-secondary-700 p-5 hover:shadow-lg transition-all duration-200"
                whileHover={{ y: -4 }}
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-2">{note.title}</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(note)}
                      className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 p-1 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-full transition-colors"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(note.id)}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="border-l-4 border-primary-300 dark:border-primary-700 pl-3 my-3">
                  <p className="text-secondary-600 dark:text-secondary-400 whitespace-pre-line line-clamp-3">
                    {note.content || <span className="italic text-secondary-400 dark:text-secondary-500">No content</span>}
                  </p>
                </div>
                <div className="flex justify-between items-center mt-3 pt-2 border-t border-secondary-100 dark:border-secondary-700">
                  <div className="text-xs text-secondary-500 dark:text-secondary-500 flex items-center">                    <svg className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {note.created_at && formatDate(note.created_at)}
                  </div>
                  <div className="text-xs font-medium text-primary-600 dark:text-primary-400">
                    NoteMaster
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (          <div className="text-center py-10 px-6 bg-white dark:bg-secondary-800 rounded-xl border border-dashed border-secondary-300 dark:border-secondary-600">
            <svg className="w-16 h-16 mx-auto text-secondary-400 dark:text-secondary-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-medium text-secondary-900 dark:text-secondary-100 mb-2">
              {searchQuery ? 'No matching notes found' : 'Your NoteMaster collection is empty'}
            </h3>
            <p className="text-secondary-500 dark:text-secondary-400 mb-4">
              {searchQuery 
                ? 'Try using different keywords or clear your search' 
                : 'Create your first note to start organizing your thoughts and ideas'}
            </p>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 dark:text-primary-400 dark:bg-primary-900/20 rounded-md hover:bg-primary-100 dark:hover:bg-primary-900/40"
              >
                <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear Search
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesPage;
