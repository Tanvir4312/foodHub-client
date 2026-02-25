import { getAllUserAction } from "@/action/admin.action";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserType } from "@/types/user.type";
import Link from "next/link";

const AdminAllUser = async () => {
  const res = await getAllUserAction();
  const allUser = res?.data;

  return (
    <div>
      {allUser.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xl">SR</TableHead>
              <TableHead className="text-xl">Create Date</TableHead>
              <TableHead className="text-xl">Name</TableHead>
              <TableHead className="text-xl">Email</TableHead>
              <TableHead className="text-xl">Role</TableHead>
              <TableHead className="text-xl">Status</TableHead>

              <TableHead className="text-xl">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allUser?.map((user: UserType, idx: number) => (
              <TableRow key={user.id}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>
                  {new Date(user.createdAt).toLocaleString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell
                  className={`${user?.status === "ACTIVE" ? "text-green-600" : "text-red-600"}`}
                >
                  {user.status}
                </TableCell>

                <TableCell className="font-bold hover:text-amber-600 cursor-pointer">
                  <Link href={`/admin-dashboard/status/${user.id}`}>
                    Status Update
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-red-500 text-2xl">
          You do not have any incoming orders right now
        </p>
      )}
    </div>
  );
};

export default AdminAllUser;
