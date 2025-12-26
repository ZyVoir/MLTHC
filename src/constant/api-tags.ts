export enum ApiTag {
    TODOS = 'Todos',
    USERS = 'Users',
}

export const TAG_DESCRIPTIONS = [
    { name: ApiTag.TODOS, description: 'Manage task items and deadlines.' },
    { name: ApiTag.USERS, description: 'Operations regarding user profiles.' },
];