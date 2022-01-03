export interface Categories {
    id: number | null;
    category: string | null;
    user_id: string | null;
    created_at: string | null;
    updated_at: string | null;
}

export const emptyCategory:Categories[] = [{
    id: null,
    category: null,
    user_id: null,
    created_at: null,
    updated_at: null
}];

export interface List{
    id: number | null;
    title: string | null;
    deadline: string | null;
    description: string | null;
    user_id: number | null;
    category_id: number | null;
    created_at: string | null;
    updated_at: string | null;
}

export const emptyList:List[] = [{
    id: null,
    title: null,
    deadline: null,
    description: null,
    user_id: null,
    category_id: null,
    created_at: null,
    updated_at: null
}];

export interface UserDetails{
    id: number | null;
    username: string | null;
    email: string | null;
}

export const emptyUserDetails: UserDetails = {
    id: null,
    username: null,
    email:null
}
