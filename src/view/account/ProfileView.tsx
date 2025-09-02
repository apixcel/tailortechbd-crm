import { ChangePassword, EditProfile } from "@/components";

const ProfileView = () => {
  return (
    <div className="flex w-full flex-col gap-[16px] border-[1px] border-border-muted bg-white p-[16px]">
      <EditProfile />
      <ChangePassword />
    </div>
  );
};

export default ProfileView;
