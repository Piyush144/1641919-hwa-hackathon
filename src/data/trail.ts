export type Station = {
  id: string
  name: string
  clue: string
  answer: string
  hint: string
  treasure: string
}

export const STATIONS: Station[] = [
  {
    id: 'old-oak',
    name: 'The Old Oak',
    clue: 'I stand with arms outstretched but never wave. My rings tell stories of years I gave. What am I standing beneath at the trailhead?',
    answer: 'tree',
    hint: 'It has bark, branches, and leaves.',
    treasure: 'A rusted brass compass',
  },
  {
    id: 'whispering-brook',
    name: 'Whispering Brook',
    clue: 'I run but never walk, have a bed but never sleep, and have a mouth but never speak. Where does the water chatter over stones?',
    answer: 'river',
    hint: 'It flows over pebbles toward the sea.',
    treasure: 'A smooth river-worn stone',
  },
  {
    id: 'raven-perch',
    name: "Raven's Perch",
    clue: 'I speak without a mouth and hear without ears. I am unseen but always near when you shout across the ravine. What am I?',
    answer: 'echo',
    hint: 'It repeats your own words back to you.',
    treasure: 'A glossy black feather',
  },
  {
    id: 'moon-pond',
    name: 'Moon Pond',
    clue: 'I am light as a feather, yet the strongest person cannot hold me for more than a few minutes. What am I, that you hold while walking the trail at dusk?',
    answer: 'breath',
    hint: 'You take it in and let it go.',
    treasure: 'A vial of still water',
  },
  {
    id: 'hidden-cache',
    name: 'Hidden Cache',
    clue: 'The more of me there is, the less you see. I fall with the sun and vanish with the dawn. Where must you look to find the final chest?',
    answer: 'darkness',
    hint: 'It is the absence of light.',
    treasure: 'A small chest of trail tokens',
  },
]
