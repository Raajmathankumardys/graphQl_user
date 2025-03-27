"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapUserToModel = mapUserToModel;
function mapUserToModel(user) {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        status: user.status,
    };
}
