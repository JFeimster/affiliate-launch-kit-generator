// storage.js - Local storage management for Affiliate Launch Kit Generator

/**
 * Storage utilities for saving and retrieving data from localStorage
 * Includes draft saving, kit history, and user preferences
 */

const Storage = {
    /**
     * Storage keys
     */
    keys: {
        DRAFT: 'affiliate_kit_draft',
        HISTORY: 'affiliate_kit_history',
        PREFERENCES: 'affiliate_user_preferences',
        LAST_GENERATED: 'affiliate_last_generated',
        FAVORITES: 'affiliate_favorites'
    },

    /**
     * Save draft form data
     */
    saveDraft(formData) {
        try {
            const draft = {
                ...formData,
                savedAt: new Date().toISOString(),
                version: '1.0'
            };
            
            localStorage.setItem(this.keys.DRAFT, JSON.stringify(draft));
            console.log('Draft saved:', draft);
            return true;
        } catch (error) {
            console.error('Error saving draft:', error);
            return false;
        }
    },

    /**
     * Load draft form data
     */
    loadDraft() {
        try {
            const draftStr = localStorage.getItem(this.keys.DRAFT);
            if (!draftStr) return null;
            
            const draft = JSON.parse(draftStr);
            console.log('Draft loaded:', draft);
            return draft;
        } catch (error) {
            console.error('Error loading draft:', error);
            return null;
        }
    },

    /**
     * Clear draft
     */
    clearDraft() {
        try {
            localStorage.removeItem(this.keys.DRAFT);
            console.log('Draft cleared');
            return true;
        } catch (error) {
            console.error('Error clearing draft:', error);
            return false;
        }
    },

    /**
     * Check if draft exists
     */
    hasDraft() {
        return localStorage.getItem(this.keys.DRAFT) !== null;
    },

    /**
     * Save generated kit to history
     */
    saveToHistory(kitData) {
        try {
            let history = this.getHistory();
            
            // Add new kit to beginning of array
            history.unshift({
                ...kitData,
                id: Date.now().toString(),
                savedAt: new Date().toISOString()
            });
            
            // Keep only last 10 kits
            if (history.length > 10) {
                history = history.slice(0, 10);
            }
            
            localStorage.setItem(this.keys.HISTORY, JSON.stringify(history));
            console.log('Kit saved to history:', kitData.metadata.niche);
            return true;
        } catch (error) {
            console.error('Error saving to history:', error);
            return false;
        }
    },

    /**
     * Get kit history
     */
    getHistory() {
        try {
            const historyStr = localStorage.getItem(this.keys.HISTORY);
            if (!historyStr) return [];
            
            return JSON.parse(historyStr);
        } catch (error) {
            console.error('Error loading history:', error);
            return [];
        }
    },

    /**
     * Get kit from history by ID
     */
    getKitById(id) {
        const history = this.getHistory();
        return history.find(kit => kit.id === id);
    },

    /**
     * Delete kit from history
     */
    deleteFromHistory(id) {
        try {
            let history = this.getHistory();
            history = history.filter(kit => kit.id !== id);
            
            localStorage.setItem(this.keys.HISTORY, JSON.stringify(history));
            console.log('Kit deleted from history:', id);
            return true;
        } catch (error) {
            console.error('Error deleting from history:', error);
            return false;
        }
    },

    /**
     * Clear all history
     */
    clearHistory() {
        try {
            localStorage.removeItem(this.keys.HISTORY);
            console.log('History cleared');
            return true;
        } catch (error) {
            console.error('Error clearing history:', error);
            return false;
        }
    },

    /**
     * Save user preferences
     */
    savePreferences(preferences) {
        try {
            const prefs = {
                ...preferences,
                updatedAt: new Date().toISOString()
            };
            
            localStorage.setItem(this.keys.PREFERENCES, JSON.stringify(prefs));
            console.log('Preferences saved:', prefs);
            return true;
        } catch (error) {
            console.error('Error saving preferences:', error);
            return false;
        }
    },

    /**
     * Load user preferences
     */
    loadPreferences() {
        try {
            const prefsStr = localStorage.getItem(this.keys.PREFERENCES);
            if (!prefsStr) {
                return this.getDefaultPreferences();
            }
            
            return JSON.parse(prefsStr);
        } catch (error) {
            console.error('Error loading preferences:', error);
            return this.getDefaultPreferences();
        }
    },

    /**
     * Get default preferences
     */
    getDefaultPreferences() {
        return {
            defaultPlatform: 'Multi-platform',
            autoSave: true,
            showTips: true,
            theme: 'light'
        };
    },

    /**
     * Save last generated kit reference
     */
    saveLastGenerated(metadata) {
        try {
            const data = {
                ...metadata,
                generatedAt: new Date().toISOString()
            };
            
            localStorage.setItem(this.keys.LAST_GENERATED, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Error saving last generated:', error);
            return false;
        }
    },

    /**
     * Get last generated kit metadata
     */
    getLastGenerated() {
        try {
            const dataStr = localStorage.getItem(this.keys.LAST_GENERATED);
            if (!dataStr) return null;
            
            return JSON.parse(dataStr);
        } catch (error) {
            console.error('Error loading last generated:', error);
            return null;
        }
    },

    /**
     * Add kit to favorites
     */
    addToFavorites(kitId, kitData) {
        try {
            let favorites = this.getFavorites();
            
            // Check if already favorited
            if (favorites.some(fav => fav.id === kitId)) {
                console.log('Kit already in favorites');
                return false;
            }
            
            favorites.push({
                id: kitId,
                niche: kitData.metadata.niche,
                audienceSize: kitData.metadata.audienceSize,
                favoritedAt: new Date().toISOString()
            });
            
            localStorage.setItem(this.keys.FAVORITES, JSON.stringify(favorites));
            console.log('Kit added to favorites:', kitId);
            return true;
        } catch (error) {
            console.error('Error adding to favorites:', error);
            return false;
        }
    },

    /**
     * Remove kit from favorites
     */
    removeFromFavorites(kitId) {
        try {
            let favorites = this.getFavorites();
            favorites = favorites.filter(fav => fav.id !== kitId);
            
            localStorage.setItem(this.keys.FAVORITES, JSON.stringify(favorites));
            console.log('Kit removed from favorites:', kitId);
            return true;
        } catch (error) {
            console.error('Error removing from favorites:', error);
            return false;
        }
    },

    /**
     * Get all favorites
     */
    getFavorites() {
        try {
            const favoritesStr = localStorage.getItem(this.keys.FAVORITES);
            if (!favoritesStr) return [];
            
            return JSON.parse(favoritesStr);
        } catch (error) {
            console.error('Error loading favorites:', error);
            return [];
        }
    },

    /**
     * Check if kit is favorited
     */
    isFavorite(kitId) {
        const favorites = this.getFavorites();
        return favorites.some(fav => fav.id === kitId);
    },

    /**
     * Auto-save functionality
     */
    setupAutoSave(formId, interval = 30000) {
        const form = document.getElementById(formId);
        if (!form) return;
        
        const preferences = this.loadPreferences();
        if (!preferences.autoSave) return;
        
        // Save on input change
        form.addEventListener('input', () => {
            const formData = this.getFormData(formId);
            this.saveDraft(formData);
        });
        
        // Also save periodically
        setInterval(() => {
            const formData = this.getFormData(formId);
            if (formData.niche || formData.audience) {
                this.saveDraft(formData);
            }
        }, interval);
        
        console.log('Auto-save enabled');
    },

    /**
     * Get form data
     */
    getFormData(formId) {
        const form = document.getElementById(formId);
        if (!form) return {};
        
        return {
            niche: form.querySelector('#niche')?.value || '',
            audience: form.querySelector('#audience')?.value || '',
            platform: form.querySelector('#platform')?.value || ''
        };
    },

    /**
     * Restore draft to form
     */
    restoreDraftToForm(formId) {
        const draft = this.loadDraft();
        if (!draft) return false;
        
        const form = document.getElementById(formId);
        if (!form) return false;
        
        const nicheInput = form.querySelector('#niche');
        const audienceSelect = form.querySelector('#audience');
        const platformSelect = form.querySelector('#platform');
        
        if (nicheInput && draft.niche) nicheInput.value = draft.niche;
        if (audienceSelect && draft.audience) audienceSelect.value = draft.audience;
        if (platformSelect && draft.platform) platformSelect.value = draft.platform;
        
        console.log('Draft restored to form');
        return true;
    },

    /**
     * Get storage usage statistics
     */
    getStorageStats() {
        try {
            let totalSize = 0;
            
            for (let key in localStorage) {
                if (localStorage.hasOwnProperty(key)) {
                    totalSize += localStorage[key].length + key.length;
                }
            }
            
            return {
                totalSize: totalSize,
                totalSizeKB: (totalSize / 1024).toFixed(2),
                itemCount: localStorage.length,
                hasDraft: this.hasDraft(),
                historyCount: this.getHistory().length,
                favoritesCount: this.getFavorites().length
            };
        } catch (error) {
            console.error('Error getting storage stats:', error);
            return null;
        }
    },

    /**
     * Export all data
     */
    exportAllData() {
        return {
            draft: this.loadDraft(),
            history: this.getHistory(),
            preferences: this.loadPreferences(),
            favorites: this.getFavorites(),
            lastGenerated: this.getLastGenerated(),
            exportedAt: new Date().toISOString()
        };
    },

    /**
     * Import data
     */
    importData(data) {
        try {
            if (data.draft) this.saveDraft(data.draft);
            if (data.history) localStorage.setItem(this.keys.HISTORY, JSON.stringify(data.history));
            if (data.preferences) this.savePreferences(data.preferences);
            if (data.favorites) localStorage.setItem(this.keys.FAVORITES, JSON.stringify(data.favorites));
            if (data.lastGenerated) localStorage.setItem(this.keys.LAST_GENERATED, JSON.stringify(data.lastGenerated));
            
            console.log('Data imported successfully');
            return true;
        } catch (error) {
            console.error('Error importing data:', error);
            return false;
        }
    },

    /**
     * Clear all stored data
     */
    clearAll() {
        try {
            Object.values(this.keys).forEach(key => {
                localStorage.removeItem(key);
            });
            
            console.log('All storage cleared');
            return true;
        } catch (error) {
            console.error('Error clearing storage:', error);
            return false;
        }
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Storage;
}
