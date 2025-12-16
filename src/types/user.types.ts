import { UserRole } from './user-role.enum';

declare global {
    namespace Medicore {
        interface User {
            id: string;
            role: UserRole;
            sessionId?: string;
        }
    }
}

export { };

