import { AlertCircle } from "lucide-react";

const ChallengesSection = ({ challenges = [] }) => {
    if (!challenges.length) {
        return null;
    }

    return (
        <section className="border-b border-slate-200 px-6 py-6">
            <div className="mb-5 flex items-center gap-2">
                <AlertCircle
                    size={18}
                    className="text-[#00a968]"
                />

                <h2 className="text-sm font-bold uppercase tracking-wider text-[#010a1f]">
                    Challenges
                </h2>
            </div>

            <div className="space-y-3">
                {challenges.map((challenge, index) => {
                    const text =
                        typeof challenge === "string"
                            ? challenge
                            : challenge.text ||
                              challenge.description ||
                              challenge.challenge;

                    return (
                        <div
                            key={
                                challenge._id ||
                                challenge.id ||
                                index
                            }
                            className="flex items-start gap-3 rounded-lg bg-slate-50 p-4"
                        >
                            <span className="mt-0.5 text-[#00a968]">
                                •
                            </span>

                            <p className="text-sm leading-6 text-slate-700">
                                {text || "-"}
                            </p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default ChallengesSection;