import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type ResultStatus = 'selected' | 'waiting' | 'not-selected';

type MemberResult = {
    name: string;
    phone: string;
    section?: string;
};

const selectedMembers: MemberResult[] = [
    { name: 'Aaditya Kumar Pandey', phone: '9713321212', section: 'P11 (12)' },
    { name: 'Mahendra Thapa', phone: '9767504267', section: 'P9' },
    { name: 'Nishchal Neupane', phone: '9744908890', section: 'B14' },
    { name: 'Rami Bhuju', phone: '9863695373', section: 'P5' },
    { name: 'Unnati Kafle', phone: '9768249859', section: 'P5' },
    { name: 'Diya Khatri', phone: '9860905734', section: 'P5' },
    { name: 'Vivan Thapa', phone: '9766362630', section: 'S5' },
    { name: 'Neeyam Chamlagai', phone: '9767239714', section: 'P9' },
    { name: 'Swikrit Shrestha', phone: '9768734616', section: 'P9' },
    { name: 'Samyog Khanal', phone: '9768519788', section: 'P5' },
    { name: 'Sichu Shrestha', phone: '9704524742', section: 'P1' },
    { name: 'Yachu Shrestha', phone: '9704524687', section: 'P1' },
    { name: 'Samir Ghorasaini', phone: '9842478280', section: 'P3' },
    { name: 'Sabitri Khadka', phone: '9761939274', section: 'B3' },
    { name: 'Alisha Baraili', phone: '9813195802', section: 'P5' },
    { name: 'Divyani Shrestha', phone: '9863481957', section: 'P10' },
    { name: 'Manish Kumar Mahato', phone: '9702592050', section: 'P2' },
    { name: 'Anup Aryal', phone: '9743660385', section: 'B6' },
    { name: 'Manita Kumari Mahara', phone: '9807779783', section: 'B17' },
    { name: 'Kriyana Panchkoti', phone: '9810130178', section: 'B9' },
    { name: 'Sampada Neupane', phone: '9808112170', section: 'B3' },
    { name: 'Shreejal Tiwari', phone: '9747240421', section: 'B10' },
    { name: 'Prajwal Dahal', phone: '9828558363', section: 'B10' },
    { name: 'Anuja Khatri', phone: '9747477078', section: 'B3' },
    { name: 'Umanga Karki', phone: '9748270466', section: 'P5' },
    { name: 'Hemant Regmi', phone: '9819538271', section: 'P3' },
    { name: 'Jonaid Ali', phone: '9761847705', section: 'P2' },
    { name: 'Yamansha Sharma', phone: '9849882366', section: 'B8' },
    { name: 'Anshika Khatri', phone: '9843207766', section: 'P5' },
    { name: 'Parasmani Dhami', phone: '9768068810', section: 'P3' },
    { name: 'Prayushma KC', phone: '9841378274', section: 'P5' },
    { name: 'Smarika Khadka', phone: '9762783060', section: 'B1' },
    { name: 'Gyalzen Sherpa', phone: '9762600763', section: 'P9' },
    { name: 'Sandhya Kerawat', phone: '9706649861', section: 'B16' },
    { name: 'Nanina Tiruwa', phone: '9818594240', section: 'B15' },
    { name: 'Sahil Jogi', phone: '9804027885', section: 'S6' },
    { name: 'Bikalpa Acharya', phone: '9704577417', section: 'B16' },
    { name: 'Rishi Oli', phone: '9761378424', section: 'P9' },
    { name: 'Diwas Niraula', phone: '9842552301', section: 'B17' },
    { name: 'Kriti Shrestha', phone: '9704193885', section: 'B9' },
    { name: 'Rashmi Shrestha', phone: '9768538088', section: 'B16' },
    { name: 'Anushka Pandey', phone: '9846832476', section: 'B3' },
    { name: 'Dipya Hamal', phone: '9744794533', section: 'P10' },
    { name: 'Archana KC', phone: '9841961340', section: 'P3' },
    { name: 'Rihana Panchkoti', phone: ':)', section: ':)' },
    { name: 'Veronica Shrestha', phone: '9744979834', section: 'P5' },
    { name: 'Denisha Adhikari', phone: '9866454485', section: 'P1' },
    { name: 'Aaisma Khatri', phone: '9749231843', section: 'B14' },
    { name: 'Pallawi Dhakal', phone: '9768062767', section: 'P1' },
    { name: 'Joshna Basnet', phone: '9713841570', section: 'B14' },

];

const waitingMembers: MemberResult[] = [
    { name: 'Dhrub Kumar Yadav', phone: '9716096509', section: 'P2' },
    { name: 'Bikesh Pandit', phone: '9807879842', section: 'P3' },
    { name: 'Unique Gaisi', phone: '9765553380', section: 'P9' },
    { name: 'Manisha Sah', phone: '9709008129', section: 'B17' },
    { name: 'Nidhi Rai', phone: '97080229318', section: 'B4' },
    { name: 'Smith Bajbanshi', phone: '9862992973', section: 'P2' },
    { name: 'Krishal Shrestha', phone: '9860566726', section: 'P9' },
    { name: 'Khomraj Pantha', phone: '9763673123', section: 'B6' },
    { name: 'Rahul Bhagat Sudi', phone: '9817844180', section: 'P10' },
    { name: 'Richa Bist', phone: '9851038797', section: 'B3' },


];

const normalizeName = (value: string) => value.trim().replace(/\s+/g, ' ').toLowerCase();

const ResultPage = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const determineResult = (value: string): ResultStatus => {
        const normalized = normalizeName(value);
        const isSelected = selectedMembers.some((candidate) => normalizeName(candidate.name) === normalized);
        const isWaiting = waitingMembers.some((candidate) => normalizeName(candidate.name) === normalized);

        if (isSelected) {
            return 'selected';
        }

        if (isWaiting) {
            return 'waiting';
        }

        return 'not-selected';
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!name.trim()) {
            setError('Please enter your name to check the result.');
            return;
        }
        setError('');

        const result = determineResult(name);
        const selectedMember = selectedMembers.find((candidate) => normalizeName(candidate.name) === normalizeName(name));
        const waitingMember = waitingMembers.find((candidate) => normalizeName(candidate.name) === normalizeName(name));
        const matchedMember = selectedMember ?? waitingMember;
        const searchParams = new URLSearchParams({
            name: name.trim(),
            status: result,
        });

        if (matchedMember) {
            searchParams.set('phone', matchedMember.phone);
            if (matchedMember.section) {
                searchParams.set('section', matchedMember.section);
            }
        }

        navigate(`/result/view?${searchParams.toString()}`);
    };

    return (
        <section className="min-h-[calc(100vh-6rem)] flex items-center justify-center bg-white px-4 pt-40 pb-10 sm:px-6 sm:pt-48 sm:pb-12 dark:bg-slate-950">
            <div className="w-full max-w-sm rounded-[2rem] border border-red-200 bg-white p-7 shadow-[0_20px_80px_rgba(220,38,38,0.12)] backdrop-blur-xl transition-all duration-500 ease-out dark:border-red-900/40 dark:bg-slate-950/95 dark:shadow-[0_20px_80px_rgba(0,0,0,0.45)] motion-safe:transform-gpu hover:-translate-y-1">
                <div className="flex flex-col items-center gap-4 text-center">
                    <img src="/ccrc_it_logo.jpg" alt="CCRC IT Club Logo" className="h-20 w-auto object-contain" />
                    <div>
                        <h1 className="text-3xl font-bold text-slate-950 dark:text-white">Check Your Interview Result</h1>
                        <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                            To check CCRC IT Club interview result, please enter your full name.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                    <input
                        type="text"
                        value={name}
                        onChange={(event) => {
                            setName(event.target.value);
                            if (error) setError('');
                        }}
                        placeholder="Enter your full name"
                        className="w-full rounded-3xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500/20 dark:border-red-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-red-500 dark:focus:bg-slate-900"
                    />

                    {error && (
                        <p className="text-sm text-rose-600 dark:text-rose-400">{error}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full rounded-3xl bg-rose-600 px-5 py-4 text-sm font-semibold text-white transition hover:bg-rose-700"
                    >
                        Check Your Result !
                    </button>
                </form>

                <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
                    © {new Date().getFullYear()} CCRC IT CLUB | Secure • Fast • Accurate
                </p>
            </div>
        </section>
    );
};

export default ResultPage;
