import { useState } from "react"
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { ImSpinner6, ImSpinner9 } from 'react-icons/im'
import { FaInfoCircle } from 'react-icons/fa'
import newRequest from "../../utils/newRequest";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from 'react-hot-toast'

const Badwords = () => {
    const user = JSON.parse(localStorage.getItem("currentUser"))

    const [word, setWord] = useState("")
    const [err, setErr] = useState(null);
    const [isManage, setIsManage] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const queryClient = useQueryClient();

    const { isLoading: isBWLoading, error: BWError, data: badwords } = useQuery({
        queryKey: ["badwordsUser"],
        queryFn: () =>
            newRequest.get(`badwords/${user?._id}`).then((res) => {
                return res.data;
            }),
    });

    const addWord = useMutation(
        (newWord) => newRequest.post('badwords', { word: newWord }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries("badwordsUser");
                toast.success("Word Added for Filtering");
                setWord("");
            },
            onError: (error) => {
                setErr(error.response.data);
                console.error(error);
            },
            onSettled: () => {
                setIsUploading(false);
            },
        }
    );

    const handleWord = (e) => {
        e.preventDefault();
        setErr(null);
        if (word.trim() === "") {
            setErr("Empty input");
            return;
        }
        setIsUploading(true);
        addWord.mutate(word);
    };

    const deleteWord = useMutation(
        (id) => newRequest.delete(`badwords/${id}`),
        {
            onSuccess: () => {
                queryClient.invalidateQueries("badwordsUser");
                toast.success("Word Removed");
            },
        }
    );

    return (
        <div className="py-2 flex flex-col items-center w-full gap-2">
            {isManage ? (
                <div className="flex flex-col items-center w-full gap-2">
                    <div className="flex-wrap-reverse flex items-center gap-2">
                        <p className="font-semibold text-center">Manage Offensive Words</p>
                    </div>
                    <div className="scrollbar-none w-full bg-white flex overflow-y-auto max-h-[150px] border-[1px] rounded-lg overflow-hidden flex-col items-center">
                        {isBWLoading ? (
                            <ImSpinner9 className="text-xl animate-spin text-blue-700" />
                        ) : BWError ? (
                            "-"
                        ) : badwords.length === 0 ? (
                            "Empty List"
                        ) : (
                            badwords.map((wd) => (
                                <div className="flex border-b-[1px] border-black/50 py-2 px-3 w-full items-center justify-between" key={wd._id}>
                                    <p>{wd.word}</p>
                                    <button onClick={() => deleteWord.mutate(wd._id)} className="hover:bg-gray-200 active:bg-gray-300 p-1 border-[1px] rounded-full">
                                        <AiOutlineMinus className="text-red-700" size={16} />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                    {err && (
                        <div>
                            <p className="text-center text-red-600 font-semibold">{err}</p>
                        </div>
                    )}
                    <div onClick={() => setIsManage(false)} className="flex w-full justify-center delay-1000">
                        <button className="text-blue-500">Add Words</button>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center w-full gap-2">
                    <div className="flex-wrap-reverse flex justify-center items-center gap-2">
                        <p className="font-semibold text-center">Add Offensive words</p>
                        <div>
                            <FaInfoCircle title="Enhance the environment by adding offensive words for filtering, ensuring a positive and productive online experience." className="text-blue-600" size={16} />
                        </div>
                    </div>
                    <div className="flex justify-items-center w-full h-full items-center">
                        <input className="flex border-[1px] p-2 w-full h-full" onChange={(e) => setWord(e.target.value)} type="text" name="word" id="word" value={word} />
                        <button onClick={handleWord} disabled={isUploading} className="hover:opacity-70 active:opacity-50 flex items-center justify-end p-3 bg-blue-600 w-fit h-full">
                            {isUploading ? <ImSpinner6 className="animate-spin text-white" size={16} /> : <AiOutlinePlus className="text-white" size={16} />}
                        </button>
                    </div>
                    {err && (
                        <div>
                            <p className="text-center text-red-600 font-semibold">{err}</p>
                        </div>
                    )}
                    <div onClick={() => setIsManage(true)} className="flex w-full justify-center delay-1000">
                        <button className="text-blue-500">Manage</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Badwords;
