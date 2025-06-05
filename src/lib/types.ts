export type UploadFunction<TData, TResult = void> = (data: TData) => Promise<TResult>;
export type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';
export type bond = {
        legame1:('Ammirazione' | 'Inferiorità' | 'none'), 
        legame2:('Lealtà'| 'Sfiducia'| 'none'),
        legame3: ('Affetto'|'Odio' | 'none')
};

export type Item = {
        name:string
}

