const questions =[
    {
      id: 1,
      text: 'Do you use a dishwasher to wash your dishes?',
      options: [
        { text: 'Yes', valueSaving: 111, valueTotal: 15, task: 'Well done, you\'ve saved time & 15 litres of water ', category: 'Dishwashing', type: 'Achievement' },
        { text: 'No', valueSaving: 0, valueTotal: 126, task: 'Pre-rinsing dishes wastes 1,232 litres of water a year - and with modern dishwashers, it\’s totally unnecessary. ', category: 'Dishwashing', type: 'Task' },
      ],
      trainingText: 'Hand washing dishes can use up to 5 times more water compared to using a dishwasher.',
      content: {
        message: 'Switch to a dishwasher and save both water and time!',
        image: 'an article and a podcast:',
        video: 'https://thepublicsradio.org/episode/whats-the-most-efficient-way-to-wash-your-dishes-',
        additionalInfo: 'Studies suggest that using a dishwasher uses 73% less water than washing dishes by hand. Clearly this depends hugely on your hand-washing style: if you use a washing up bowl and don’t fill the sink too much, any savings would be marginal; but if you wash up with the tap running you’ll be needlessly flushing around 100 litres down the drain per wash.'
      }
    },
    {
      id: 2,
      text: 'Do you pre-rinse your dishes before stacking them in the dishwasher?',
      options: [
        { text: 'Yes', valueSaving: 0, valueTotal: 36, task: 'Do you need to rinse? Act accordingly!', category: 'Dishwashing', type: 'Task' },
        { text: 'No', valueSaving: 21, valueTotal: 15, task: 'Well done for saving water!', category: 'Dishwashing', type: 'Achievement' },
      ],
      trainingText: 'Pre-rinsing dishes may not always be necessary and can lead to a lot of water wastage.',
      content: {
        message: 'Modern dishwashers are designed to handle tough food residues. By skipping pre-rinsing, you could save gallons of water over a year!',
        image: 'an article from theguardian.com:',
        video: 'https://www.theguardian.com/lifeandstyle/2020/dec/25/how-to-properly-load-a-dishwasher-if-you-pre-rinse-it-might-actually-come-out-dirtier',
        additionalInfo: 'Modern dishwashers do not need plates and dishes to be rinsed, whether by hand or on the pre-rinse cycle. Just scrape any leftovers into the bin, and fully load up.'
      }
    },
    {
      id: 3,
      text: 'Do you run your dishwasher on a  full or half load cycle?',
      options: [
        { text: 'Full', valueSaving: 11, valueTotal: 22, task: 'Your making a positive change by fully loading your dishwasher - Well done! ', category: 'Dishwashing', type: 'Achievement' },
        { text: 'Half full', valueSaving: 0, valueTotal: 22, task: 'Did you know, a fully loaded dishwasher will save you 11 liters . Please take necessary action!', category: 'Dishwashing', type: 'Task' },
      ],
      trainingText: 'Maximizing the load of your dishwasher before running can lead to significant water savings over time.',
      content: {
        message: 'Make every drop count! Wait a bit longer, and ensure your dishwasher is full before starting a cycle.',
        image: 'a how-to article from which.co.uk:',
        video: 'https://www.which.co.uk/reviews/dishwashers/article/how-to-load-your-dishwasher-and-what-s-dishwasher-safe-aTkf79u5rqyY',
        additionalInfo: 'A half-loaded dishwasher uses nearly the same amount of water as a full load. Save water and energy by ensuring maximum load before washing.'
      }
    },
    {
      id: 4,
      text: 'Are the taps in your home fitted with flow regulators ("aerators")?',
      options: [
        { text: 'Yes', valueSaving: 44, valueTotal: 76, task: 'That\'s great - your saving over 8 litres of water a minute ', category: 'Plumbing', type: 'Achievement' },
        { text: 'No', valueSaving: 0, valueTotal: 120, task: 'Did you know, aerators can use less than 800ml of water. Please take necessary action and save money.', category: 'Plumbing', type: 'Task' },
      ],
      trainingText: 'Regular taps can use up to twice as much water as their low-flow counterparts. Consider making the switch!',
      content: {
        message: 'Every drop counts! By switching to low-flow taps, you can play a vital role in conserving water.',
        image: 'a DIY video on how to fit an aerator:',
        video: 'https://www.youtube.com/watch?v=B2cQe9pTwVo',
        additionalInfo: 'Upgrading to low-flow taps is a cost-effective way to conserve water without compromising on functionality. Plus, they can help you save money in the long run.'
      }
    },
    {
      id: 5,
      text: 'How long does it take you to take shower?',
      options: [
        { text: 'Under 5 mins', valueSaving: 160, valueTotal: 70, task: '5 minutes shower is the target and it is a hard challenge, congratulations!', category: 'Shower', type: 'Achievement' },
        { text: '5 - 10 mins', valueSaving: 80, valueTotal: 150, task: 'Decreasing your shower duration makes a significant difference, take the necessary action!', category: 'Shower', type: 'Task' },
        { text: '11 - 15 mins', valueSaving: -20, valueTotal: 250, task: 'Decreasing your shower duration makes a significant difference, take the necessary action!', category: 'Shower', type: 'Task' },
        { text: 'Over 15 mins', valueSaving: -220, valueTotal: 450, task: 'Decreasing your shower duration makes a significant difference, take the necessary action!', category: 'Shower', type: 'Task' },
        { text: 'Use a bucket', valueSaving: 210, valueTotal: 20, task: 'Bucket usage is the target and it is a hard challenge, congratulations!', category: 'Shower', type: 'Achievement' }
      ],
      trainingText: 'Every additional minute in the shower uses up to 5 gallons of water.',
      content: {
        message: 'Time to reflect! Can you cut down a few minutes?',
        image: 'a how to article from showrgem.com:',
        video: 'https://showergem.com/blogs/news/how-to-take-a-quick-shower-in-less-than-6-minutes',
        additionalInfo: 'By reducing your shower time, you not only save water but also contribute to a healthier environment.'
      }
    },
    {
      id: 6,
      text: 'Do you run your laundry on a full load or half full load? ',
      options: [
        { text: 'Full', valueSaving: 90, valueTotal: 180, task: 'By full loading your laundry you save 90 liters water , congratulations!', category: 'Laundry', type: 'Achievement' },
        { text: 'Half full', valueSaving: 0, valueTotal: 180, task: '90 liters more with full loaded laundries, take the necessary action!', category: 'Laundry', type: 'Task' },
      ],
      trainingText: 'Washing half loads frequently can lead to more water usage over time.',
      content: {
        message: 'Plan ahead! Combine your laundry to make full loads and reduce water wastage.',
        image: 'an article about laundry tips:',
        video: 'https://www.leadhousehold.co.za/latest-news/ten-tips-save-water-domestic-laundry/',
        additionalInfo: 'Running your machine with full loads can also extend its life and reduce wear and tear.'
      }
    },
    {
      id: 7,
      text: 'Do you turn off the water while you brush your teeth?',
      options: [
        { text: 'Yes', valueSaving: 2, valueTotal: 2, task: 'You saved 10 liters for your each brush , congratulations!', category: 'Daily activities', type: 'Achievement' },
        { text: 'No', valueSaving: 0, valueTotal: 4, task: 'Turn off the water and save 10 liters more for your each brush, take the necessary action!', category: 'Daily activities', type: 'Task' },
      ],
      trainingText: 'Turning on the water while you brush your teeth can lead to more water usage over time.',
      content: {
        message: 'Did you know - if you turn off the tap everytime  while brushing your teeth, you could save around 12 litres of water.',
        image: 'a reference source from waterwise:',
        video: 'https://www.savewatersavemoney.co.uk/water-efficiency-tips-advice/view/105/turn-off-the-tap,-it%27s-as-simple-as-that!.html',
        additionalInfo: 'According to Waterwise - If each adult in England and Wales turned off the tap when brushing their teeth, we’d save enough water for nearly 500,000 homes or to fill 180 Olympic swimming pools – every day!'
      }
    },
    {
      id: 8,
      text: 'Are you aware of any leaking pipes?',
      options: [
        { text: 'Yes', valueSaving: 0, valueTotal: 32, task: '32 liters more with only one leaky faucet, take the necessary action!', category: 'Plumbing', type: 'Task' },
        { text: 'No', valueSaving: 32, valueTotal: 0, task: 'Good job on maintaining your plumbing! It is great but please be aware as leaks are unpredicatable. ', category: 'Plumbing', type: 'Achievement' },
      ],
      trainingText: 'Maintaining your plumbing system ensures no wastage and saves money.',
      content: {
        message: 'Way to go! Continue regular checks to keep your plumbing in top shape.',
        image: 'a how to article to fix it:',
        video: 'https://pureplumbingpros.com.au/plumber/information/how-to-fix-a-leaking-tap',
        additionalInfo: 'Leaking taps, leaking toilets, and leaking pipes all have something in common, they waste a lot of water! Your water bill will often show abnormal water consumption if there is a leak.'
      }
    },
    {
      id: 9,
      text: 'Do you own a vehicle?',
      options: [
        { text: 'No', valueSaving: 0, valueTotal: 0 },
        { text: 'Yes', valueSaving: 0, valueTotal: 0 },
      ],
    },
    {
      id: 10,
      text: 'Do you manually wash your car or do you use pressure washer system?',
      options: [
        { text: 'Yourself', valueSaving: 0, valueTotal: 200, task: '120 liters more with each car wash, take the necessary action!', category: 'Car owners', type: 'Task' },
        { text: 'A professional car cleaning service', valueSaving: 120, valueTotal: 80, task: 'Washing your car by pressure washer systems you saved 120 liters water , congratulations!', category: 'Car owners', type: 'Achievement' },
      ],
      trainingText: 'Washing your car by yourself can use up to 200 gallons of water. More efficient methods can drastically reduce water usage.',
      content: {
        message: 'Save water while giving your car a sparkle! Consider alternative washing methods.',
        image: 'about washing cars:',
        video: 'https://mde.maryland.gov/programs/water/waterconservation/pages/carwashing.aspx#:~:text=Using%20a%20power%20washer%20can,without%20an%20auomatic%20shutoff%20nozzle.',
        additionalInfo: 'Consider using only 2 buckets of water instead of a water hose to restrict wastage. Alternatively, fit hosepipes with turn-off nozzles.'
      }
    }
  ];
  export default questions;
