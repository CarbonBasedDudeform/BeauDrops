# BeauDrops

Cellular Automata Fluid Simulation in HTML5. 

Or, Simulation of Raindrops falling in a pond. 

# Description

The Cellular Automata are in a 2D world. 

The Laws applied are very simple and are applied to a Moores Neighbourhood configuration.

Law #1 : Law of Decay := The Energy of each cell in system steadily decreases at a fixed rate

Law #2 : Law of Energy Spread := The Energy of the neighbouring cells is greater than or equal to the average energy of the neighbourhood

Law #2 means that if the neighbouring cells energy is lower than the neighbourhoods average then its energy increases. 
This increases the neighbourhoods total energy. 
At the same time Law #1 means the energy is decreasing. 
This combination creates a system, with the current fixed variables, that hovers around a critical phase between Under and Over Energetic Systems.

The Under Energetic System has tiny pin pricks of light colour that fade quickly.

The Over Energetic System has light colour dominate quickly, appearing monochromatic with no activity.
