import { Guard, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Guard()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    canActivate(req, context: ExecutionContext): boolean {
        const { handler } = context;
        const roles = this.reflector.get<string[]>('roles', handler);
        if (!roles) {
            return true;
        }

        const user = req.user;
        const hasRole = () => !!user.roles.find((role) => !!roles.find((item) => item === role));
        return user && user.roles && hasRole();
    }
}
