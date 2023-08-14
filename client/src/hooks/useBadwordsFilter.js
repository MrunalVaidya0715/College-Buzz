import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Filter from 'bad-words';

const useBadwordsFilter = () => {
    const [filter, setFilter] = useState(null);

    const { isLoading, error, data } = useQuery({
        queryKey: ["badwords"],
        queryFn: () =>
            newRequest.get(`badwords`).then((res) => {
                return res.data;
            }),
    });

    useEffect(() => {
        if (!(isLoading || error)) {
            const newBadWords = data.map(word => word.word);
            const badWordFilter = new Filter({ regex: /\*|\.|$/gi });
            badWordFilter.addWords(...newBadWords);
            setFilter(badWordFilter);
        }
    }, [isLoading, error, data]);

    return filter;
};

export default useBadwordsFilter;
