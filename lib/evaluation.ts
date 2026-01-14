// Evaluation Calculation Functions

import {
    EvaluationSummary,
    CriteriaAverage,
    ExpertEvaluation,
    evaluationCriteria,
    MAX_POSSIBLE_SCORE
} from '@/types/evaluation';

export function calculateSummary(expertsData: {
    expert1?: ExpertEvaluation;
    expert2?: ExpertEvaluation;
    expert3?: ExpertEvaluation;
}): EvaluationSummary {
    const summary: EvaluationSummary = {
        totalScore: 0,
        maxPossibleScore: MAX_POSSIBLE_SCORE,
        percentage: 0,
        qualityLevel: '',
        criteriaAverages: []
    };

    evaluationCriteria.forEach(criteria => {
        let totalScore = 0;
        let count = 0;

        Object.values(expertsData).forEach(expert => {
            if (expert) {
                const scoreObj = expert.scores.find(s => s.criteriaId === criteria.id);
                if (scoreObj) {
                    totalScore += scoreObj.score;
                    count++;
                }
            }
        });

        const average = count > 0 ? totalScore / count : 0;
        const weightedScore = average * criteria.weight;

        summary.criteriaAverages.push({
            criteriaId: criteria.id,
            name: criteria.name,
            averageScore: average,
            weightedScore: weightedScore,
            maxWeightedScore: criteria.maxScore,
            weight: criteria.weight
        });

        summary.totalScore += weightedScore;
    });

    summary.percentage = (summary.totalScore / summary.maxPossibleScore) * 100;

    if (summary.percentage >= 90) {
        summary.qualityLevel = 'Excellent (เป็นแบบอย่าง)';
    } else if (summary.percentage >= 80) {
        summary.qualityLevel = 'Very Good (ดีมาก)';
    } else if (summary.percentage >= 70) {
        summary.qualityLevel = 'Good (ดี)';
    } else if (summary.percentage >= 60) {
        summary.qualityLevel = 'Fair (พอใช้)';
    } else {
        summary.qualityLevel = 'Needs Improvement (ต้องปรับปรุง)';
    }

    return summary;
}

export function getExpertTotalScore(expertData: ExpertEvaluation): number {
    return expertData.scores.reduce((sum, s) => {
        const criteria = evaluationCriteria.find(c => c.id === s.criteriaId);
        return sum + (s.score * (criteria?.weight || 1));
    }, 0);
}

export function getQualityBadgeColor(percentage: number): string {
    if (percentage >= 90) return 'bg-green-500';
    if (percentage >= 80) return 'bg-blue-500';
    if (percentage >= 70) return 'bg-yellow-500';
    if (percentage >= 60) return 'bg-orange-500';
    return 'bg-red-500';
}

export interface CollectedRecommendation {
    priority: 'critical' | 'high' | 'enhancement';
    title: string;
    detail: string;
    expectedResult: string;
    source: string;
}

export function collectAllRecommendations(
    expertsData: { expert1?: ExpertEvaluation; expert2?: ExpertEvaluation; expert3?: ExpertEvaluation }
): CollectedRecommendation[] {
    const allRecs: CollectedRecommendation[] = [];

    Object.entries(expertsData).forEach(([expertId, expertData]) => {
        if (expertData?.recommendations) {
            expertData.recommendations.forEach(rec => {
                allRecs.push({
                    ...rec,
                    source: expertId
                });
            });
        }
    });

    // Sort by priority: critical first, then high, then enhancement
    const priorityOrder = { critical: 0, high: 1, enhancement: 2 };
    return allRecs.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
}
