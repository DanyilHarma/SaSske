"use client";
import { useGetSiteStatsQuery } from "@/shared/api/siteStatApi";
import {
    Table,
    TableBody,
    TableHeader,
    TableRow,
    TableCell,
    TableHead,
} from "@/shared/ui/table/table";

function convertTime(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const min = minutes % 60;
    return `${hours} часов ${min} минут`;
}

export default function StatsTable() {
    const { data = [], isLoading, error } = useGetSiteStatsQuery();

    if (isLoading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка загрузки данных</p>;

    return (
        <Table className="border rounded-md overflow-hidden">
            <TableHeader>
                <TableRow className="border-b">
                    <TableHead className="border-r">Сайт</TableHead>
                    <TableHead>Время</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((stat) => (
                    <TableRow key={stat.id} className="border-b">
                        <TableCell className="border-r">{stat.site}</TableCell>
                        <TableCell className="border-r">{convertTime(stat.timeSpent)}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
