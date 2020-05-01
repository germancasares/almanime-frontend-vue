import { Season } from "@/enums";
import Axios from 'axios';
import { AnimeWithEpisodes, Episode, ModelWithMeta, Anime } from '@/models';
import Helper from '@/utils/helper';

export class AnimeService {
    public static async GetSeason(year: number, season: Season, page: number, includeMeta = false): Promise<ModelWithMeta<Anime[]>> {
        return (await Axios.get(`anime/year/${year}/season/${season}?page=${page}&includeMeta=${includeMeta}`)).data;
    }

    public static async GetBySlug(slug: string): Promise<AnimeWithEpisodes> {
        const anime = (await Axios.get(`anime/slug/${slug}`)).data

        // anime.startDate is string even though is defined as DateTime in Typescript.
        anime.startDate = Helper.StringToDateTime(anime.startDate.toString());

        // The same for the episode.aired DateTimes.
        anime.episodes.forEach(
        (episode: Episode) =>
            episode.aired = episode.aired !== null
            ? Helper.StringToDateTime(episode.aired.toString())
            : episode.aired,
        );

        return anime;
    }

    public static async CreateBoookmark(slug: string) {
        await Axios.post(`anime/slug/${slug}/bookmark`);
    }

    public static async DeleteBoookmark(slug: string) {
        await Axios.delete(`anime/slug/${slug}/bookmark`);
    }
}