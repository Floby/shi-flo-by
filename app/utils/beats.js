function beats (a, b) {
  if(a === 'rock' && b === 'rock') return false;
  if(a === 'rock' && b === 'paper') return false;
  if(a === 'rock' && b === 'scissors') return true;
  if(a === 'paper' && b === 'rock') return true;
  if(a === 'paper' && b === 'paper') return false;
  if(a === 'paper' && b === 'scissors') return false;
  if(a === 'scissors' && b === 'rock') return false;
  if(a === 'scissors' && b === 'paper') return true;
  if(a === 'scissors' && b === 'scissors') return false;
  return false;
}
export default beats;
