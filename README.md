# BE4k
Bot for BE4k platform - API.ai and Node.js

The BE4K Bot was conceived to assist Cisco and Partner sales teams in positioning and quoting Business Edition 4000 solutions. It is especially useful for users that do not have a strong Cisco Collaboration and Cisco ordering tools background since it provides a nice combination of automated responses and the automatic generation queries for human assistance via Cisco’s Virtual Engineering pre-sales service.
Built using the API.AI platform for up front NLP of queries and Webhook calls into built.io for fulfillment of the more complex tasks using node.js, the BE4K bot can easily be extended to cover more queries and back-end notifications to to guarantee it is providing the most accurate and up to date information.

###### Scope of the repository #######

The files with the JSON are made to be imported in API.ai. This is a live script that can be used to create an agent that captures the informaiton from the requester through Cisco Spark. BE4K bot can be added to any room or used directly in 1:1 space. 
Node.JS script is complementary to enable some of the actions on the side of the agent since the NLP platform lacks that functional.

In the first stage the Bot is providing following information:
1. Availability of the BE4000 platform around the world. It has most of the countries, definitely the one where the bot is available as of May 2017. 
2. Main features - we didnt have intention of putting entire datasheet in the repository of the Bot, but just a sample which can be elaborated later. 
3. Available documentation: Q&A, FAQ, Ordering Guide
4. Suggestion for alternate platforms - at this stage the Bot will simply introduce the user to other platforms. In future we hope to enable the AI to have a more fruitful discussion and suggest based on the best practice. 
5. GVE services: 
    - Create a simple preliminary BoM
    - Customer Engagement - schedule an engineer to attend a call on named date and time
    
###### Instructions for the User ######
1. add the Bot on Cisco Spark to one of the rooms where you wish to have the conversation:  BE4K@sparkbot.io
    1.1 In case it is a 1:1 room feel free talking to the Bot
    1.2 In case you are not alone with the Bot, you will need to address the Bot every time you are asking it something. It         is shy... Use @BE4K to address the Bot.
    2. Start the conversation, have a small talk, ask the Bot how it is feeling... When you are ready, use "help" to see            what it can do.
    
    
