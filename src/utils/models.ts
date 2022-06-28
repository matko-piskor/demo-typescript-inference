export type Book = {
    id: number;
    title: string;
    author: string;
    isRead: boolean;
    createdAt: Date;
    categoryId: number;
};

export type Category = {
    id: number;
    name: string;
};
