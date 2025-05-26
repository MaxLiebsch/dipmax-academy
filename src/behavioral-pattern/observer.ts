/*
👀 Behavioral Pattern 2: Observer
✅ Purpose:
Allow an object (called the Subject) to maintain a list of observers 
that get notified automatically when the subject's state changes.


🧩 Real-World Scenario:
You're building a news alert system. Subscribers can register to receive updates 
when breaking news is published.

✅ Your Task:
Create a NewsAgency class (the Subject) with:

subscribe(listener: (headline: string) => void)

unsubscribe(listener)

publish(headline: string)

Subscribers are just functions (e.g., smsSubscriber, emailSubscriber, etc.) 
that get called when news is published.

🧪 Bonus Ideas:
Prevent duplicate subscriptions

Track total subscriber count

Allow topic-based filtering (e.g., only notify sports/news/etc.)
*/

interface Subscriber {
  (headline: string): void;
}

type Subjects = "news" | "sports";
type SubscribeProps = {
  subject: Subjects;
  listener: Subscriber;
};

type PublicProps = {
  subject: Subjects;
  headline: string;
};

class NewsAgency {
  private subscribers = new Map<Subjects, Subscriber[]>();
  private totalSubscribers = 0;

  constructor() {}
  subscribe({ subject, listener }: SubscribeProps) {
    if (this.subscribers.has(subject)) {
      const subscriberList = this.subscribers.get(subject);
      const idx = subscriberList!.indexOf(listener);
      if (idx === -1) {
        subscriberList?.push(listener);
        this.subscribers.set(subject, subscriberList!);
        this.totalSubscribers += 1;
        console.log("You have subscribed to", subject);
      } else {
        console.log("You are already subscribed to subject", subject);
      }
    } else {
      this.subscribers.set(subject, [listener]);
      this.totalSubscribers += 1;
      console.log("You have subscribed to", subject);
    }
  }
  unsubscribe({ subject, listener }: SubscribeProps) {
    if (this.subscribers.has(subject)) {
      const subscriberList = this.subscribers.get(subject);
      if (subscriberList) {
        const idx = subscriberList.indexOf(listener);
        if (idx === -1) {
          console.log("You are not subscribed to", subject);
        } else {
          subscriberList.splice(idx, 1);
          if (subscriberList.length) {
            this.subscribers.set(subject, subscriberList);
          } else {
            this.subscribers.delete(subject);
          }
          this.totalSubscribers -= 1;
        }
      }
    } else {
      console.log("You are not subscribed to ", subject);
    }
  }
  publish({ headline, subject }: PublicProps) {
    if (this.subscribers.has(subject)) {
      this.subscribers.get(subject)?.forEach((sub) => {
        sub(headline);
      });
    } else {
      console.log("No Subsribers for ", subject);
    }
  }
  getTotalSubsribers() {
    return this.totalSubscribers;
  }
}

const agency = new NewsAgency();

const firstSubscriber = (headline: string) => {
  console.log(`Harry received: ${headline}`);
};

const secondSubscriber = (headline: string) => {
  console.log(`Lena received: ${headline}`);
};

const thirdSubscriber = (headline: string) => {
  console.log(`Leo received: ${headline}`);
};

agency.subscribe({ subject: "sports", listener: firstSubscriber });
agency.subscribe({ subject: "sports", listener: firstSubscriber });
console.log("Total subscribers:", agency.getTotalSubsribers());
agency.publish({
  subject: "sports",
  headline: "Suprice on the field - no players",
});
agency.unsubscribe({ subject: "sports", listener: firstSubscriber });
agency.publish({ subject: "sports", headline: "Tennis wonder" });
agency.unsubscribe({ subject: "sports", listener: firstSubscriber });
console.log("Total subscribers:", agency.getTotalSubsribers());
agency.subscribe({ subject: "sports", listener: firstSubscriber });
agency.subscribe({ subject: "sports", listener: secondSubscriber });
agency.subscribe({ subject: "sports", listener: thirdSubscriber });
agency.publish({ subject: "sports", headline: "Tennis wonder" });
agency.subscribe({ subject: "news", listener: thirdSubscriber });
agency.publish({ subject: "sports", headline: "They won the championship" });
agency.publish({ subject: "news", headline: "He is over the top‼️‼️‼️" });
agency.subscribe({ subject: "news", listener: firstSubscriber });
agency.publish({ subject: "news", headline: "They are madly in love. ❤️🦴" });
console.log("Total subscribers:", agency.getTotalSubsribers());
agency.unsubscribe({ subject: "sports", listener: thirdSubscriber });
console.log("Total subscribers:", agency.getTotalSubsribers());
