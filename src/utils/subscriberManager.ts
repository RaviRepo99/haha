// Subscriber Management Utility
// This file provides functions to manage CCRC IT Club subscribers

export interface Subscriber {
    email: string;
    subscribedAt: string;
    source: string;
}

export class SubscriberManager {
    private static STORAGE_KEY = 'ccrc_subscribers';

    // Get all subscribers
    static getAllSubscribers(): Subscriber[] {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error getting subscribers:', error);
            return [];
        }
    }

    // Get subscriber emails only
    static getSubscriberEmails(): string[] {
        return this.getAllSubscribers().map(sub => sub.email);
    }

    // Check if email is already subscribed
    static isSubscribed(email: string): boolean {
        const subscribers = this.getAllSubscribers();
        return subscribers.some(sub =>
            sub.email.toLowerCase() === email.toLowerCase()
        );
    }

    // Add new subscriber
    static addSubscriber(email: string, source: string = 'website'): boolean {
        try {
            if (this.isSubscribed(email)) {
                return false; // Already subscribed
            }

            const subscribers = this.getAllSubscribers();
            const newSubscriber: Subscriber = {
                email: email.toLowerCase().trim(),
                subscribedAt: new Date().toISOString(),
                source
            };

            subscribers.push(newSubscriber);
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(subscribers));
            return true;
        } catch (error) {
            console.error('Error adding subscriber:', error);
            return false;
        }
    }

    // Remove subscriber
    static removeSubscriber(email: string): boolean {
        try {
            const subscribers = this.getAllSubscribers();
            const filtered = subscribers.filter(sub =>
                sub.email.toLowerCase() !== email.toLowerCase()
            );

            if (filtered.length !== subscribers.length) {
                localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error removing subscriber:', error);
            return false;
        }
    }

    // Export subscriber data as JSON
    static exportData(): void {
        try {
            const subscribers = this.getAllSubscribers();
            const dataStr = JSON.stringify(subscribers, null, 2);
            const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

            const exportFileDefaultName = `ccrc_subscribers_${new Date().toISOString().split('T')[0]}.json`;

            const linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            linkElement.click();
        } catch (error) {
            console.error('Error exporting data:', error);
        }
    }

    // Get subscriber statistics
    static getStats() {
        const subscribers = this.getAllSubscribers();
        const now = new Date();
        const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

        return {
            total: subscribers.length,
            last7Days: subscribers.filter(sub => new Date(sub.subscribedAt) >= last7Days).length,
            last30Days: subscribers.filter(sub => new Date(sub.subscribedAt) >= last30Days).length,
            sources: subscribers.reduce((acc, sub) => {
                acc[sub.source] = (acc[sub.source] || 0) + 1;
                return acc;
            }, {} as Record<string, number>)
        };
    }

    // Clear all subscribers (use with caution!)
    static clearAll(): void {
        localStorage.removeItem(this.STORAGE_KEY);
    }
}

// Usage examples:
// console.log('All subscribers:', SubscriberManager.getAllSubscribers());
// console.log('Subscriber emails:', SubscriberManager.getSubscriberEmails());
// console.log('Is subscribed:', SubscriberManager.isSubscribed('test@example.com'));
// console.log('Stats:', SubscriberManager.getStats());
// SubscriberManager.exportData(); // Downloads JSON file