export type ApiResponse<T> = {
    data?: T;
    status: number;
};

export type AmnitiesFilter = {
    notInclude: Array<string>;
    condition: (normalized: string, notInclude: Array<string>) => boolean;
};