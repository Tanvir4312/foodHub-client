"use server"

import { services } from "@/services/user.services"

export const getSession = async () =>{
    return await services.getSessionService()
}