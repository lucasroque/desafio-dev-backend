import { Response, Request } from "express"
import supabase from "../config/supabase";
import { mapUser } from "../utils/maps";

export const getUser = async (req: Request, res: Response) => {

    try {
        const { userId } = req.params

        const { data, error } = await supabase
            .from('users')
            .select()
            .eq('id', userId)

        if (error) throw new Error(error.message)

        res.status(200).json(mapUser(data[0]))

    } catch (error: any) {
        console.log('error ->>> ', error)
        res.status(400).json({ message: error.message })
    }
}
