## API REFERENCE

### Books

#### Model

```
type Book = {
    id: number;
    title: string;
    author: string;
    isRead: boolean;
    createdAt: Date;
    categoryId: number;
};
```

#### Methods
```
route: /api/books
method: get
returns: Book[]

route /api/books/new
method: post
return: Book

route: /api/books/:id
method: get
returns: Book

route: /api/books/:id/edit
method: put
returns: Book

route: /api/books/:id/delete
method: delete
return: -
```

### Categories

#### Model

```
type Category = {
    id: number;
    name: string;
};
```

#### Methods
```
route: /api/categories
method: get
returns: Category[]

route /api/categories/new
method: post
return: Category

route: /api/categories/:id
method: get
returns: Category

route: /api/categories/:id/edit
method: put
returns: Category

route: /api/categories/:id/delete
method: delete
return: -
```
