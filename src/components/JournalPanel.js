import PDFMerger from 'pdf-merger-js/browser';
import React, { useEffect, useState } from 'react';
import { Skeleton } from 'antd';
import userInfoPage from "../journal/user-info.pdf";
import weekPage from "../journal/week.pdf";
import dayLeftPage from "../journal/day-left.pdf";
import dayRightPage from "../journal/day-right.pdf";
import affirmationsPage from "../journal/affirmations.pdf";

function buildWeeklyPages(settings) {
    const pages = [];

    // 1. Weekly insert
    if (settings.insert_week) {
        pages.push(weekPage);
    }

    // 2. Daily
    if (settings.insert_day) {
        for (let i = 0; i < 7; i++) {
            pages.push(dayLeftPage);
            pages.push(dayRightPage);
        }
    }

    return pages;
}

async function buildJournal(settings) {
    const merger = new PDFMerger();

    // Build journal
    const pages = [];

    // 1. Cover 
    // 2. User info
    pages.push(userInfoPage);

    // 3. Affirmations
    if (settings.insert_affirmations) {
        pages.push(affirmationsPage);
        pages.push(dayRightPage);
    }

    // 3. Per week
    const start = settings.date_range[0].startOf('week');
    const end = settings.date_range[1].startOf('week');
    const weeksToAdd = end.diff(start, 'week') + 1;
    // >> Monthly insert?
    if (settings.insert_month) {
        // .... insert right away.
    }

    let lastMonth = start.month();
    for (let i = 0; i < weeksToAdd; i++) {
        const currentDate = start.clone().add(1, 'week');
        const currentMonth = currentDate.month();
        // (if beginning of next date is different)
        if (currentMonth !== lastMonth && settings.insert_month) {
            // ... insert monthly
            lastMonth = currentMonth;
        }

        const weeklyPages = buildWeeklyPages(settings);
        pages.push(...weeklyPages);
    }

    // Merge all files
    for (const file of pages) {
        const res = await window.fetch(file)
        const ab = await res.blob()
        await merger.add(ab)
    }

    // Save as pdf
    const mergedPdf = await merger.saveAsBlob();
    const url = URL.createObjectURL(mergedPdf);

    return url;
}


const JournalPanel = ({ settings, setIsGenerating }) => {
    const [mergedPdfUrl, setMergedPdfUrl] = useState();
    
    useEffect(() => {
        setIsGenerating(true);

        buildJournal(settings).catch((err) => {
            throw err;
        }).then(setMergedPdfUrl).then(() => {
            setIsGenerating(false);
        });

        return () => setMergedPdfUrl();
    }, [settings, setMergedPdfUrl, setIsGenerating]);

    return !mergedPdfUrl ? (
        <Skeleton.Input
            style={{ width: '100%', maxWidth: 800, height: 1000 }}
            active={true} />
    ) : (
        <iframe
            height={1000}
            width='100%'
            src={`${mergedPdfUrl}`}
            title='pdf-viewer'
            style={{ resize: 'both', overflow: 'auto', maxWidth: '800px' }}
        ></iframe>
    );
};

export default JournalPanel;