import { randomUUID } from 'crypto';
import { Kafka } from 'kafkajs';

async function bootstrap() {

  const kafka = new Kafka({
    clientId: 'test-producer',
    brokers: ['maximum-jackass-12961-us1-kafka.upstash.io:9092'],
    sasl: {
      mechanism: 'scram-sha-256',
      username: 'bWF4aW11bS1qYWNrYXNzLTEyOTYxJEEANgvfEcL59U6BD6nSWKEevGiH_5rujW4',
      password: 'SG0_Yuo27nJ_Wkf5gUKQIBIseGphB4fzA-Gvmqg2boWWmGA9isjeQE-CsMTFjBdHPYfSGg==',
    },
    ssl: true,
  });
  
  const producer = kafka.producer();
  
  await producer.connect();
  
  await producer.send({
    topic: 'notifications.send-notification',
    messages: [
      {
        value: JSON.stringify({
          content: 'Nova solicitação de amizade!',
          category: 'social',
          recipientId: randomUUID(),
        })
      }
    ]
  })

  await producer.disconnect();
}

bootstrap();