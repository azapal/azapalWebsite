<template>
    <div class="bg-white rounded-lg shadow-md p-6 max-w-xl mx-auto">
      <h2 class="text-xl font-bold text-gray-800 mb-4">Upload Files</h2>
      
      <!-- Upload area -->
      <div 
        class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
        @click="triggerFileInput"
        @dragover.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
        @drop.prevent="handleFileDrop"
        :class="{ 'bg-blue-50 border-blue-400': isDragging }"
      >
        <input 
          type="file" 
          ref="fileInput" 
          @change="handleFileSelection" 
          multiple
          class="hidden" 
        />
        
        <div v-if="!files.length">
          <div class="text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <p class="mt-2 text-sm text-gray-600">Drag and drop files here or click to browse</p>
          <p class="text-xs text-gray-500 mt-1">Supported formats: JPG, PNG, PDF, etc.</p>
        </div>
        
        <div v-else class="text-gray-700 text-sm">
          <p><span class="font-medium">{{ files.length }}</span> file(s) selected</p>
          <p class="text-blue-600 mt-2 underline cursor-pointer">Add more files</p>
        </div>
      </div>
      
      <!-- File list -->
      <div v-if="files.length" class="mt-6">
        <div class="text-sm font-medium text-gray-700 mb-2">Selected files:</div>
        <ul class="space-y-2">
          <li v-for="(file, index) in files" :key="index" class="flex items-center justify-between bg-gray-50 p-3 rounded-md">
            <div class="flex items-center">
              <div class="text-gray-400 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <div class="text-sm font-medium text-gray-700 truncate max-w-xs">{{ file.name }}</div>
                <div class="text-xs text-gray-500">{{ formatFileSize(file.size) }}</div>
              </div>
            </div>
            <button 
              @click.prevent="removeFile(index)"
              class="text-red-500 hover:text-red-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </li>
        </ul>
      </div>
      
      <!-- Upload progress -->
      <div v-if="isUploading" class="mt-6">
        <div class="flex justify-between text-sm text-gray-700 mb-1">
          <span>Uploading...</span>
          <span>{{ uploadProgress }}%</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div class="bg-blue-600 h-2 rounded-full" :style="{ width: uploadProgress + '%' }"></div>
        </div>
      </div>
      
      <!-- Upload button -->
      <div class="mt-6">
        <button 
          @click="uploadFiles" 
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          :disabled="isUploading || !files.length"
        >
          <span v-if="!isUploading">Upload {{ files.length ? files.length : '' }} File{{ files.length !== 1 ? 's' : '' }}</span>
          <span v-else>Uploading...</span>
        </button>
      </div>
      
      <!-- Success message -->
      <div v-if="uploadSuccess" class="mt-4 p-3 bg-green-50 text-green-700 rounded-md text-sm">
        Files uploaded successfully!
      </div>
      
      <!-- Error message -->
      <div v-if="errorMessage" class="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
        {{ errorMessage }}
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FileUploader',
    data() {
      return {
        files: [],
        isDragging: false,
        isUploading: false,
        uploadProgress: 0,
        uploadSuccess: false,
        errorMessage: ''
      }
    },
    methods: {
      triggerFileInput() {
        this.$refs.fileInput.click();
      },
      handleFileSelection(event) {
        const newFiles = Array.from(event.target.files);
        this.addFiles(newFiles);
        
        // Reset the input so the same file can be selected again if removed
        event.target.value = null;
      },
      handleFileDrop(event) {
        this.isDragging = false;
        const newFiles = Array.from(event.dataTransfer.files);
        this.addFiles(newFiles);
      },
      addFiles(newFiles) {
        this.errorMessage = '';
        this.uploadSuccess = false;
        
        // Add new files to the existing array
        this.files = [...this.files, ...newFiles];
      },
      removeFile(index) {
        this.files.splice(index, 1);
        this.errorMessage = '';
        this.uploadSuccess = false;
      },
      formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
      },
      uploadFiles() {
        if (!this.files.length) return;
        
        this.isUploading = true;
        this.uploadProgress = 0;
        this.errorMessage = '';
        this.uploadSuccess = false;
        
        // Simulate upload progress
        const interval = setInterval(() => {
          this.uploadProgress += 5;
          
          if (this.uploadProgress >= 100) {
            clearInterval(interval);
            this.handleUploadCompletion();
          }
        }, 100);
        
        // In a real implementation, you would use something like this:
        /*
        const formData = new FormData();
        this.files.forEach(file => {
          formData.append('files', file);
        });
        
        axios.post('your-cloud-upload-endpoint', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: (progressEvent) => {
            this.uploadProgress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
          }
        })
        .then(response => {
          this.handleUploadCompletion(true);
          // Handle success response
        })
        .catch(error => {
          this.isUploading = false;
          this.errorMessage = 'Upload failed. Please try again.';
          // Handle error
        });
        */
      },
      handleUploadCompletion(success = true) {
        this.isUploading = false;
        
        if (success) {
          this.uploadSuccess = true;
          this.files = [];
        } else {
          this.errorMessage = 'Upload failed. Please try again.';
        }
      }
    }
  }
  </script>