<script lang="ts">
    import type { UploadFunction, UploadStatus } from '$lib/types';
  
    export let uploadFunction: UploadFunction<unknown, unknown>;
    export let data: unknown;
    export let buttonText = 'Upload';
    export let successMessage = 'Upload completato!';
    export let errorMessage = 'Errore durante upload';
  
    let status: UploadStatus = 'idle';
    let result: unknown;
    let error: Error | null = null;
  
    async function handleUpload() {
      status = 'uploading';
      error = null;
  
      try {
        result = await uploadFunction(data);
        status = 'success';
      } catch (err) {
        error = err instanceof Error ? err : new Error(String(err));
        status = 'error';
      }
    }
  </script>
  
  <button on:click={handleUpload} disabled={status === 'uploading'}>
    {status === 'uploading' ? 'Caricamento...' : buttonText}
  </button>
  
  {#if status === 'success'}
    <div class="success">{successMessage}</div>
  {/if}
  
  {#if status === 'error' && error}
    <div class="error">{errorMessage}: {error.message}</div>
  {/if}
  
  <style>
    .success { color: green; }
    .error { color: red; }
  </style>




