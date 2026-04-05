import { useState } from 'react';
import X from 'lucide-react/dist/esm/icons/x';
import Bot from 'lucide-react/dist/esm/icons/bot';

interface ChatPopupProps {
    onClose: () => void;
}

const ChatPopup = ({ onClose }: ChatPopupProps) => {
    const [chatMessages, setChatMessages] = useState([
        { id: 1, text: "Hi! I'm the CCRC IT Club assistant. How can I help you today?", sender: 'bot' }
    ]);
    const [currentMessage, setCurrentMessage] = useState('');

    const handleSendMessage = () => {
        if (!currentMessage.trim()) return;

        const userMessage = { id: Date.now(), text: currentMessage, sender: 'user' };
        setChatMessages(prev => [...prev, userMessage]);
        const messageToRespond = currentMessage;
        setCurrentMessage('');

        // Simple bot responses
        setTimeout(() => {
            const botResponse = getBotResponse(messageToRespond.toLowerCase());
            const botMessage = { id: Date.now() + 1, text: botResponse, sender: 'bot' };
            setChatMessages(prev => [...prev, botMessage]);
        }, 1000);
    };

    const getBotResponse = (message: string): string => {
        const lowerMessage = message.toLowerCase();

        // Casual conversation responses
        if (lowerMessage.includes('how are you') || lowerMessage.includes('how do you do')) {
            return "I'm doing great, thank you for asking! I'm here to help you learn more about CCRC IT Club. How can I assist you today?";
        }

        if (lowerMessage.includes('i am doing good') || lowerMessage.includes('i\'m doing good') ||
            lowerMessage.includes('i am fine') || lowerMessage.includes('i\'m fine') ||
            lowerMessage.includes('good') && (lowerMessage.includes('i am') || lowerMessage.includes('i\'m'))) {
            return "That's wonderful to hear! I'm glad you're doing well. Is there anything specific about CCRC IT Club you'd like to know?";
        }

        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            return "Hello! Welcome to CCRC IT Club. I'm the club assistant, here to help you with any questions about our community, events, or membership. What would you like to know?";
        }

        if (lowerMessage.includes('thank you') || lowerMessage.includes('thanks')) {
            return "You're very welcome! If you have any more questions about CCRC IT Club, feel free to ask. We're always here to help!";
        }

        // Club-specific information
        if (lowerMessage.includes('about') || lowerMessage.includes('what is') && lowerMessage.includes('club')) {
            return "CCRC IT Club is a vibrant community of tech enthusiasts at CCRC College in Kathmandu, Nepal. We're dedicated to fostering innovation, learning, and collaboration in technology. Our club provides a platform for students to develop skills, work on exciting projects, and connect with like-minded individuals.\n\n🎯 Our Mission: To create a supportive environment where members can learn, grow, and build amazing projects together.\n\n👥 Founded: [Year]\n📍 Location: CCRC, Kathmandu, Nepal\n🌟 Members: Growing community of tech innovators";
        }

        if (lowerMessage.includes('join') || lowerMessage.includes('member')) {
            return "Great! To join our IT Club, visit our join page or contact us directly. We welcome all students interested in technology! You can also reach us through our social media channels.";
        }

        if (lowerMessage.includes('event') || lowerMessage.includes('workshop') || lowerMessage.includes('activity')) {
            return "We host regular events and workshops! Check out our Events page to see upcoming activities. Our IT FEST is one of our biggest events. Stay tuned for more exciting tech events!";
        }

        if (lowerMessage.includes('team') || lowerMessage.includes('people')) {
            return "Our team consists of passionate tech enthusiasts working on various projects. Visit our Team page to meet our amazing members! We have developers, designers, and tech innovators.";
        }

        // AI and Technology information
        if (lowerMessage.includes('ai') || lowerMessage.includes('artificial intelligence') ||
            lowerMessage.includes('machine learning') || lowerMessage.includes('chatbot') ||
            lowerMessage.includes('automation') || lowerMessage.includes('intelligent') ||
            lowerMessage.includes('smart') || lowerMessage.includes('robot')) {
            return "AI is one of our core focuses at CCRC IT Club! We're passionate about artificial intelligence, machine learning, and intelligent automation. Our club members work on exciting AI projects including:\n\n🤖 Chatbots and conversational AI\n🧠 Machine learning models\n📊 Data analysis and prediction\n🎨 AI-powered creative tools\n🔧 Automation solutions\n\nWe host regular workshops on AI topics and encourage members to explore cutting-edge technologies. Whether you're interested in building your first AI model or diving deep into advanced machine learning, our community is here to support your journey!\n\nJoin us to learn, build, and innovate with AI! 🚀";
        }

        // Website creator information
        if (lowerMessage.includes('who made') || lowerMessage.includes('who created') ||
            lowerMessage.includes('who built') || lowerMessage.includes('developer') ||
            lowerMessage.includes('creator') || lowerMessage.includes('made website') ||
            lowerMessage.includes('built website') || lowerMessage.includes('website by')) {
            return "This website was created by Mitesh Mandal, a passionate student at CCRC College! 🎓\n\n👨‍💻 Mitesh is a dedicated tech enthusiast and developer who built this platform to showcase CCRC IT Club's activities, events, and community. His work helps connect students, showcase projects, and promote technological innovation at our college.\n\n📧 Email: contactme@miteshmandal.com\n📱 Instagram: https://www.instagram.com/mites.shh/\n💻 GitHub: https://github.com/miteshparadox\n\nMitesh's creativity and technical skills have made this website a valuable resource for our IT community. Thank you for visiting! 🙏";
        }

        // Contact and social media information
        if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('connect')) {
            return "📍 Location: Capital College and Research Center (CCRC)\n   GPO Box 9737, Koteshwor (Near Balkumari Bridge), Kathmandu, Nepal\n\n📞 Phone: 5100423, 5100456\n📠 Fax: 5100781\n📧 College Email: info@ccrc.edu.np\n🌐 Website: ccrc.edu.np\n\n👥 Leadership Team:\n👑 President: [President Name] - president@ccrcitclub.com\n🎯 Patron: [Patron Name] - patron@ccrcitclub.com\n\n📧 Club Email: support@ccrcit.com\n🌐 Facebook: https://www.facebook.com/ccrcinfotechclub\n📱 Instagram: @ccrcitclub\n💬 Discord: Join our community server\n\n🕒 Office Hours: [Add office hours]";
        }

        if (lowerMessage.includes('facebook') || lowerMessage.includes('social media') || lowerMessage.includes('social')) {
            return "Connect with us on social media!\n\n🌐 Facebook: https://www.facebook.com/ccrcinfotechclub\n📱 Instagram: @ccrcitclub\n💬 Discord: Join our tech community\n\nFollow us for updates on events, workshops, and tech news!";
        }

        if (lowerMessage.includes('email') || lowerMessage.includes('mail')) {
            return "You can email us at support@ccrcit.com for any inquiries, partnership opportunities, or general questions about CCRC IT Club. We typically respond within 24 hours!";
        }

        if (lowerMessage.includes('discord') || lowerMessage.includes('server') || lowerMessage.includes('community')) {
            return "Join our Discord community for real-time discussions, coding help, and networking with fellow tech enthusiasts! The invite link will be shared soon. Stay connected!";
        }

        if (lowerMessage.includes('instagram') || lowerMessage.includes('insta')) {
            return "Follow us on Instagram @ccrcitclub for behind-the-scenes content, tech tips, event highlights, and daily inspiration from the world of technology!";
        }

        // Club location and details
        if (lowerMessage.includes('where') || lowerMessage.includes('location') || lowerMessage.includes('address') ||
            lowerMessage.includes('where is this club') || lowerMessage.includes('where is this it club') ||
            lowerMessage.includes('location of it club')) {
            return "CCRC IT Club is located at Capital College and Research Center (CCRC).\n\n📍 Address: GPO Box 9737, Koteshwor (Near Balkumari Bridge), Kathmandu, Nepal\n\n📞 Phone: 5100423, 5100456\n📠 Fax: 5100781\n📧 Email: info@ccrc.edu.np\n🌐 Website: ccrc.edu.np\n\nWe're situated in the heart of Kathmandu, making it easy for students to join our activities and events!";
        }

        if (lowerMessage.includes('who made') || lowerMessage.includes('made this website') || lowerMessage.includes('website by') || lowerMessage.includes('created this website')) {
            return "This website was made by Mitesh Mandal, a student of Capital College and Research Center (CCRC).\n\nConnect with Mitesh:\n• Instagram: https://www.instagram.com/mites.shh/\n• Email: contactme@miteshmandal.com\n• GitHub: https://github.com/miteshparadox\n\nMitesh is passionate about web development, club collaboration, and helping CCRC connect with tech students via this platform.";
        }

        if (lowerMessage.includes('president') || lowerMessage.includes('leader') || lowerMessage.includes('head')) {
            return "Our club president is [President Name], a passionate tech enthusiast leading our community. You can connect with them on:\n\n📧 Email: president@ccrcitclub.com\n📱 Instagram: @president_username\n💼 LinkedIn: linkedin.com/in/president-profile\n\nThey're always excited to welcome new members!";
        }

        if (lowerMessage.includes('patron') || lowerMessage.includes('advisor') || lowerMessage.includes('mentor')) {
            return "Our esteemed patron is Ranjan Dulal, who provides valuable guidance and support to our club. Contact them at:\n\n📧 Email: patron@ccrcitclub.com\n📱 Phone: +977-XXX-XXXXXX\n💼 LinkedIn: linkedin.com/in/patron-profile\n\nTheir mentorship helps us grow and succeed!";
        }

        if (lowerMessage.includes('leadership') || lowerMessage.includes('team lead') || lowerMessage.includes('executive')) {
            return "Meet our leadership team:\n\n👑 President: [President Name]\n  • Email: president@ccrcitclub.com\n  • Instagram: @president_username\n\n🎯 Patron: [Patron Name]\n  • Email: patron@ccrcitclub.com\n  • Phone: +977-XXX-XXXXXX\n\n📞 General Contact: support@ccrcit.com\n🌐 Facebook: https://www.facebook.com/ccrcinfotechclub";
        }

        if (lowerMessage.includes('mission') || lowerMessage.includes('goal') || lowerMessage.includes('purpose')) {
            return "Our mission is to foster innovation, collaboration, and skill development in technology. We aim to create a supportive environment where members can learn, grow, and build amazing projects together!";
        }

        if (lowerMessage.includes('benefit') || lowerMessage.includes('advantage') || lowerMessage.includes('why join')) {
            return "Joining CCRC IT Club offers:\n\n🚀 Skill development through workshops\n🤝 Networking with tech professionals\n💡 Project collaboration opportunities\n🎯 Career guidance and mentorship\n🏆 Participation in competitions\n📚 Access to learning resources\n\nAnd much more!";
        }

        // Default responses
        if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
            return "Goodbye! It was great chatting with you. Don't forget to follow us on social media and check out our upcoming events. See you around!";
        }

        if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
            return "I can help you with:\n\n• Information about CCRC IT Club\n• Upcoming events and workshops\n• Membership details\n• Contact information and social media\n• General questions about our community\n\nWhat would you like to know?";
        }

        // Fallback response
        return "That's interesting! I'm here to help with information about CCRC IT Club, our events, membership, and contact details. Feel free to ask me anything specific about our tech community!";
    };

    return (
        <div className="fixed bottom-4 right-4 z-50 pointer-events-none p-4">
            <div
                className="pointer-events-auto relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-cyan-500/30 p-6 shadow-2xl dark:shadow-[0_0_40px_-10px_rgba(6,182,212,0.3)] transition-all duration-500 animate-in slide-in-from-bottom-10 fade-in zoom-in-95"
                style={{ height: '500px', display: 'flex', flexDirection: 'column' }}
            >
                {/* Background Decor */}
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Bot size={20} className="text-purple-600 dark:text-purple-400" />
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">Club Assistant</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors p-1 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto mb-4 space-y-3">
                    {chatMessages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[80%] p-3 rounded-lg text-sm ${
                                    msg.sender === 'user'
                                        ? 'bg-purple-600 text-white'
                                        : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white'
                                }`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Chat Input */}
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Type your message..."
                        className="flex-1 px-3 py-2 text-sm border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button
                        onClick={handleSendMessage}
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatPopup;