import { Outlet } from '@umijs/max';

const ManageProfileLayout = () => {
  return (
    <div className="w-full">
      <div className="p-4 min-w-[1024px] 2xl:max-w-screen-2xl mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default ManageProfileLayout;
