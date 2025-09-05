import { TUserRole } from "@/redux/features/user/user.slice";
import { IRoleAction } from "@/types";

/**
 * Check if a role has permission for a specific action
 * @param actionValue - the value to check (e.g., "create_admin")
 * @param role - the role object
 */
export const hasPermission = (actionValue: string, role?: TUserRole | null): boolean => {
  if (!role || !role.actions) return false;

  return role.actions.some((action: IRoleAction) => action.value === actionValue);
};
