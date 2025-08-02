import { PageHeadingTitle } from "@/components";
import EditRolePermissionByRoleId from "@/components/ManageRole/EditRolePermissionByRoleId";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <div className="flex w-full flex-col gap-[10px]">
      <PageHeadingTitle title="Edit Role" />
      <EditRolePermissionByRoleId roleId={id} />
    </div>
  );
};

export default page;
