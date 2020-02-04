import { FunctionalComponent, h, } from '@stencil/core';
import { BlogIndexEntry } from '../../global/types';

interface MioEntriesProps {
    entries: BlogIndexEntry[];
}
function wordcountToTimeString(wordcount: number) {
    const wordsPrSec = 5;
    const seconds = wordcount / wordsPrSec;
    return `${Math.floor(seconds / 60)}m ${Math.ceil(seconds % 60)}s`;
  }


export const MioEntries: FunctionalComponent<MioEntriesProps> = props => <ul>
    {props.entries && props.entries.filter((entry) => entry.active).map((entry) => <li>
        <stencil-route-link url={"/blog/" + entry.id} exact={true}>{entry.title}</stencil-route-link>
        <span class="metadata">{entry.time_updated ? entry.time_updated : entry.time_published} - {entry.wordcount} ord - ca {wordcountToTimeString(entry.wordcount)}</span>
    </li>)}
</ul>;