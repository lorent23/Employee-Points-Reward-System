export interface UserAttributes{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    isVerified: boolean;
    roleId?: number;
    totalPoints?: number,
    value?: number 
}
export interface RoleAttributes{
    roleId: number;
    name: string;
    description: string;
    permissions: string[];
}
export interface PointsAttributes{
    pointsId: number;
    numberOfPoints: number;
    description: string;
    pointsType: string;
    id?: number;
}
export interface exchangeAttributes{
    id: number;
    exchangeRate: number;
}