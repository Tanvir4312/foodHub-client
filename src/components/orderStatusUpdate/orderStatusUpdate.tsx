/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { updateOrderStatusAction } from "@/action/order.action";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { toast } from "sonner";

const OrderStatusUpdate = ({
  initialStatus,
  id,
}: {
  initialStatus: string;
  id: string;
}) => {
  const [newStatus, setNewStatus] = useState(initialStatus);
  const handleStatusUpdate = async (value: string) => {
    setNewStatus(value);

    const statusData = {
      status: value,
    };
    const toastId = toast.loading("Updating...");
    try {
      const res = await updateOrderStatusAction(id, statusData);

      if (res.error) {
        toast.error(res.error.message, { id: toastId });
        return;
      }
      toast.success("Update done", { id: toastId });
    } catch (err) {
      toast.error("Something went wrong, Please try again", { id: toastId });
    }
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="cursor-pointer">{newStatus}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup className="bg-[#e21b70]">
            <DropdownMenuItem
              className="cursor-pointer hover:bg-pink-50"
              onClick={() => handleStatusUpdate("ACCEPTED")}
            >
              ACCEPTED
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer hover:bg-pink-50"
              onClick={() => handleStatusUpdate("PREPARING")}
            >
              PREPARING
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer hover:bg-pink-50"
              onClick={() => handleStatusUpdate("OUTFORDELIVERY")}
            >
              OUTFORDELIVERY
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer hover:bg-pink-50"
              onClick={() => handleStatusUpdate("DELIVERED")}
            >
              DELIVERED
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer hover:bg-pink-50"
              onClick={() => handleStatusUpdate("CANCELLED")}
            >
              CANCELLED
            </DropdownMenuItem>
        
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default OrderStatusUpdate;
