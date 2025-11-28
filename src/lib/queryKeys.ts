export const queryKeys = {
    // Users
    users: {
        all: ["users"] as const,
        lists: () => [...queryKeys.users.all, "list"] as const,
        list: (filters: Record<string, unknown>) =>
            [...queryKeys.users.lists(), filters] as const,
        details: () => [...queryKeys.users.all, "detail"] as const,
        detail: (id: string) => [...queryKeys.users.details(), id] as const,
    },

    // Auth
    auth: {
        all: ["auth"] as const,
        currentUser: () => [...queryKeys.auth.all, "current-user"] as const,
    },

    // Products
    products: {
        all: ["products"] as const,
        lists: () => [...queryKeys.products.all, "list"] as const,
        list: (filters: Record<string, unknown>) =>
            [...queryKeys.products.lists(), filters] as const,
        details: () => [...queryKeys.products.all, "detail"] as const,
        detail: (id: string) => [...queryKeys.products.details(), id] as const,
    },

    // Posts/Articles
    posts: {
        all: ["posts"] as const,
        lists: () => [...queryKeys.posts.all, "list"] as const,
        list: (filters: Record<string, unknown>) =>
            [...queryKeys.posts.lists(), filters] as const,
        details: () => [...queryKeys.posts.all, "detail"] as const,
        detail: (id: string) => [...queryKeys.posts.details(), id] as const,
        infinite: (filters: Record<string, unknown>) =>
            [...queryKeys.posts.all, "infinite", filters] as const,
    },
} as const