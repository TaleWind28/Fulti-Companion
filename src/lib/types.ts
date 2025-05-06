export type UploadFunction<TData, TResult = void> = (data: TData) => Promise<TResult>;
export type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';