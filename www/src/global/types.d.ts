export interface BlogIndexEntry {
    id: string;
    path: string;
    title: string;
    byline: string;
    time_published: string;
    time_updated: string;
    wordcount: number;
    active: boolean;
    crossposts?: Link[];
}

export interface Link {
    url: string;
    title: string;
}