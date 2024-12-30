import { useEffect, useState } from "react";
import { getFinalMediaQuery } from "./helper";

const useMediaQuery = (query) => {

    const [matches, setMatches] = useState(false);

    useEffect(() => {
        let finalQuery = getFinalMediaQuery(query);
        const media = window.matchMedia(finalQuery);

        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        const listener = () => {
            let media = window.matchMedia(finalQuery);
            setMatches(media.matches);
        };

        window.addEventListener("resize", listener);
        return () => window.removeEventListener("resize", listener);
    }, [matches, query]);

    return matches;
};

export default useMediaQuery;