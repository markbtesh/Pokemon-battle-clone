import { CommonModule, isPlatformBrowser  } from '@angular/common';
import { Component,  NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OnInit,  PLATFORM_ID, Inject} from '@angular/core';
import { ScreenSizeService } from './screen-size.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  
})


export class AppComponent implements OnInit {
  title = 'pokemon-battle';
  playerHP: number = 600; // Example HP percentage for player
  opponentHP: number = 600;
  playerSprite: string = 'assets/images/lafa.png';
  opponentSprite: string = 'assets/images/cypher.png';
  playerMoveset: string[] = ["Flame Punch", "Shadow Step", "Blazing Shurikens", "Molten Fang"];
  opponentMoveset: string[] = ["Volt Dash", "Storm Bark", "Storm Step", "Lightening Kunai"];//"Volt Dash", "Storm Bark", "Storm Step", "Lightening Kunai"
  isPlayerTurn: boolean = true;
  gameMessage: string = 'What will Laffa do?';
  showTooltip = false;
  moveDetails: any = {};
  opponentStatus: string = "";
  playerStatus: string = "";
  playerHit: boolean = false;
  opponentHit: boolean = false;
  playerAttacking: boolean = false;
  opponentAttackingAnimation: string = "";
  isDodging: boolean = false;
  isOpponentDodging: boolean = false;
  accuracyDecrease: number = 0;
  OpponentAccuracyDecrease: number = 0;
  hitImageClass: string = "";
  hitPlayerImageClass: string = "";
  playerDancing: boolean = false;
  opponentDancing: boolean = false;
  paralyzeCount: number = 0;
  burnCount: number = 0;
  playerStamina: number = 50;
  opponentStamina: number = 50;
  isMobile: boolean = false;
  showMainMenu: boolean = true;
  showFightMenu: boolean = false;

  gameInProgress: boolean = true;


  moveList:  { [key: string]: any } =  {
    // Fire Moves
   "Flame Punch": {
   name:  "Flame Punch",
      category: "Physical",
      power: 70,
      accuracy: 100,
      description: "The user delivers a fiery punch that burns the target.",
      effect: "15% chance to burn the opponent.",
      statusEffect: "burn",
      effectChance: 15,
      hitImage: "scratch-mark"
    },
    "Shadow Step": {
     name: "Shadow Step",
      category: "Status",
      power: 0,
      accuracy: 200,
      description: "The user melts into the shadows, becoming untargetable for a short time.",
      effect: "The user evades all attacks next turn.",
      statusEffect: "evade",
    },
    "Blazing Shurikens":{
   
      category: "Special",
      power: 30,
      accuracy: 80,
      description: "The user hurls multiple blazing shurikens at the target.",
      effect: "Hits 2-5 times in one turn.",
      statusEffect: "",
      hitImage: "shurikens"
    },
    "Molten Fang" : {
      category: "Physical",
      power: 120,
      accuracy: 70,
      description: "The user bites with molten-hot fangs that sear the target.",
      effect: "45% chance to burn the opponent.",
      statusEffect: "burn",
      effectChance: 45,
      hitImage: "bite-mark"
    },
  
    // Electric Moves
    "Volt Dash": {
      name:  "Volt Dash",
      category: "Physical",
      power: 60,
      accuracy: 100,
      description: "The user dashes forward with electrifying speed, shocking the opponent on contact.",
      effect: "35% chance to paralyze the opponent.",
      statusEffect: "paralyze",
      effectChance: 50,
      hitImage: "volt",
      attackAnimation: "dash-left"
    },
    "Storm Bark": {
      name: "Thunder Bark",
      category: "Special",
      power: 100,
      accuracy: 85,
      description: "The user barks loudly, summoning a thunderstorm to strike the opponent.",
      effect: "30% chance to confuse the opponent.",
      statusEffect: "confuse",
      effectChance: 30,
      hitImage: "thunder",
      attackAnimation: "shake"
    },
   "Storm Step" : {
      name: "Storm Step",
      category: "Status",
      power: 0,
      accuracy: 200,
      description: "The user steps through the air, surrouned by an electric storm, becoming nearly untouchable for a turn.",
      statusEffect: "evade",
      effectChance: 0,
      attackAnimation: "step-animation"
    },
    "Lightening Kunai" :{
      name: "Lightning Kunai" ,
      category: "Special",
      power: 80,
      accuracy: 90,
      description: "The user throws electrically charged kunai that pierce through the target.",
      effect: "This move never misses.",
      effectChance: 0,
      attackAnimation: "dash-left",
      hitImage: "kunais"
    },
  };
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private screenSizeService: ScreenSizeService) {
    if (!isPlatformBrowser(this.platformId)) {
      
      // Use inspector only on the server-side
    }
  }
  
  triggerAction(action: string, move?: any): void {
    switch (action) {
      case 'attackedPlayer':
        this.playerHit = true; // Add the shaking class
        this.hitPlayerImageClass = move.hitImage || move;
        setTimeout(() => {
          this.playerHit = false; // Remove the shaking class after the animation ends
          this.hitPlayerImageClass = '';
        }, 500); // Match the duration of the CSS animation (0.5s)
        break;
  
      case 'attackedOpponent':
        this.opponentHit = true; // Add the shaking class
        this.hitImageClass = move.hitImage || move;
        setTimeout(() => {
          this.opponentHit = false; // Remove the shaking class after the animation ends
          this.hitImageClass = '';
        }, 500); // Match the duration of the CSS animation (0.5s)
        break;
  
      case 'playerAttacking':
        this.playerAttacking = true; // Add the shaking class
        setTimeout(() => {
          this.playerAttacking = false; // Remove the shaking class after the animation ends
        }, 600); // Match the duration of the CSS animation (0.6s)
        break;

        case 'opponentAttacking':
        this.opponentAttackingAnimation = move.attackAnimation; // Add the shaking class
       
        setTimeout(() => {
          this.opponentAttackingAnimation = ""; // Remove the shaking class after the animation ends
        }, 600); // Match the duration of the CSS animation (0.6s)
        break;
  
      case 'playerDancing':
        this.playerDancing = true; // Add the shaking class
        this.hitPlayerImageClass = "shadow-step"
        setTimeout(() => {
          this.playerDancing = false; // Remove the shaking class after the animation ends
          this.hitPlayerImageClass = ""
        }, 600); // Match the duration of the CSS animation (0.6s)
        break;

        case 'opponentDancing':
          this.opponentDancing = true; // Add the shaking class
          this.hitImageClass = "storm-step"
          setTimeout(() => {
            this.opponentDancing = false; // Remove the shaking class after the animation ends
              this.hitImageClass = ""
          }, 600); // Match the duration of the CSS animation (0.6s)
          break;
  
        case 'playerCharge':
        this.hitPlayerImageClass = "charge-aura";
        setTimeout(() => {
        this.hitPlayerImageClass = ""
    } , 600);
        break;
      default:
        console.error('Unknown action:', action);
    }
  }

  onFightClick() {

    if (!this.gameInProgress) return;
    
    this.showMainMenu = false;
    this.showFightMenu = true;
    this.gameMessage = 'Choose an attack:';
  }

  // Function to go back to the main menu (e.g., after selecting an attack)
  goToMainMenu() {
    this.showMainMenu = true;
    this.showFightMenu = false;
    this.gameMessage = 'What will Laffa do?';
  }

  ngOnInit(): void {

    this.screenSizeService.isMobile.subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }

  playerAttack(moveName: string) {

    if (!this.gameInProgress) return;

    if (this.isPlayerTurn) {  
    const move = this.moveList[moveName];

    const hitChance = Math.random() * 100;

    let hitTimes = 0;
   if (this.playerStatus !== "paralyzed")  {
console.log(hitChance)
    if (hitChance <= (move.accuracy - this.OpponentAccuracyDecrease) ) {
      this.isPlayerTurn = false;
      this.triggerAction("playerAttacking");
      if (moveName === "Shadow Step" || moveName === "Storm Step" ) {

        this.isDodging = true;
        this.accuracyDecrease = 70;
 
        this.triggerAction("playerDancing");

        setTimeout(() => {
           this.opponentTurn();
            }, 500);

          this.showMainMenu =  true;
          this.showFightMenu = false;
          this.showTooltip = false;

      } else {
     

      setTimeout(() => {

        if (moveName === "Blazing Shurikens") {

          for (let i = 0; i <= Math.random() * (5 - 2) + 2; i++)
            setTimeout(() => {
          this.applyDamage(move);
          hitTimes = i;
          this.gameMessage = moveName === "Blazing Shurikens" ? `It hit ` + hitTimes + ` times!` : `It hit!`;
            }, i * 200);
            
        } else 
      this.applyDamage(move);

      const effectChance = Math.random() * 100;
   
      if (effectChance < move.effectChance) {
        this.applyEffect(move, "opponentStatus");
      }
      
        
   if (this.opponentHP == 0) {
    this.gameMessage = 'Laffa won! Opponent is defeated.';
    this.gameInProgress = false;
  } else 
      this.gameMessage = this.isOpponentDodging ? `Laffa used ${moveName}. It missed!` : `It hit!`;

     if (this.opponentHP !== 0)
      this.opponentTurn();
      
     this.OpponentAccuracyDecrease = 0;
     this.isOpponentDodging = false;
      this.showMainMenu =  true;
      this.showFightMenu = false;
      this.showTooltip = false;
      }, 500);
    }

    this.gameMessage = moveName === "Shadow Step" || moveName === "Storm Step" ? `Laffa used ${move.name}. Cypher's accuracy decreased greatly for one turn` : `Laffa used ${moveName}.`;
  }else if (hitChance > (move.accuracy - this.OpponentAccuracyDecrease)){
    this.gameMessage = `Laffa used ${moveName}. It missed!`;
    if (this.paralyzeCount <= 0)
    this.triggerAction("playerAttacking");

   
   this.OpponentAccuracyDecrease = 0;
    this.isPlayerTurn = false;
    this.opponentTurn();
    this.isOpponentDodging = false;
    this.showMainMenu =  true;
    this.showFightMenu = false;
    this.showTooltip = false;
  }
   } else {
    this.gameMessage = `Laffa is paralyzed, she can't move`;

    if (this.paralyzeCount > 0) {
      this.paralyzeCount -= 1;
      this.hitPlayerImageClass = "zap"

      setTimeout(() => {
      this.hitPlayerImageClass = ""      
      }, 300);

    }

    if (this.paralyzeCount <= 0)
      this.playerStatus = '';


    this.isPlayerTurn = false;
    this.opponentTurn();
    this.isOpponentDodging = false;
    this.showMainMenu =  true;
    this.showFightMenu = false;
    this.showTooltip = false;
   }

}
}

  applyDamage(move: any) {
    const damage = move.power;
    this.opponentHP -= damage;

    this.triggerAction("attackedOpponent", move);
    if (this.opponentHP < 0) this.opponentHP = 0;

    if (this.opponentHP == 0) {
      this.gameMessage = 'Laffa won! Opponent is defeated.';
      this.gameInProgress = false;
    }
  }

  applyEffect(move: any, toWho: 'playerStatus' | 'opponentStatus') {
    if (move.statusEffect === 'burn') {
      this[toWho] = 'burned'; // Dynamically set the status
      this.gameMessage += ` ${toWho === 'playerStatus' ? 'The player' : 'The opponent'} is burned!`;
      this.burnCount = Math.random() * 4;
    } else if (move.statusEffect === 'paralyze') {
      this[toWho] = 'paralyzed'; // Dynamically set the status
      this.gameMessage += ` ${toWho === 'playerStatus' ? 'The player' : 'The opponent'} is paralyzed!`;
      this.paralyzeCount = Math.random() * 4;
    }

  }

  opponentTurn() {
   
    if (!this.gameInProgress) return;

    setTimeout(() => {
      this.gameMessage = "Cypher's turn!"
      const move = this.moveList[this.opponentMoveset[Math.floor(Math.random() * this.opponentMoveset.length)]]
      if (move.name === "Shadow Step" || move.name === "Storm Step" ) {
       
        this.isOpponentDodging = true;
        this.OpponentAccuracyDecrease = 70;
        this.gameMessage = this.OpponentAccuracyDecrease === 70 ? `Cypher used ${move.name}. Lafa's accuracy decreased greatly for one turn` :`Cypher used ${move.name}.`;
        this.triggerAction("opponentDancing");

        if (this.burnCount > 0 && this.opponentHP > 0) {
        setTimeout(() => {
         
            this.burnCount -= 1;
            this.triggerAction("attackedOpponent", "burn");
            this.opponentHP -= 50;
            setTimeout(() => {
            this.hitImageClass = ""      
            }, 700);
      
            if (this.burnCount <= 0)
              this.opponentStatus = '';
           
          
            }, 700);
          }
          this.isPlayerTurn = true;
      } else  {
        this.triggerAction("opponentAttacking", move )
      this.applyOpponentDamage(move);

      setTimeout(() => {
      if (this.burnCount > 0) {
        this.burnCount -= 1;
        this.triggerAction("attackedOpponent", "burn");
            this.triggerAction("attackedOpponent", "burn");
            this.opponentHP -= 50;
            setTimeout(() => {
            this.hitImageClass = ""      
            }, 700);
            if (this.opponentHP == 0) {
              this.gameMessage = 'Laffa won! Opponent is defeated.';
              this.gameInProgress = false;
            } 
      }

      if (this.burnCount <= 0)
        this.opponentStatus = '';
     
      }, 700);
      this.isPlayerTurn = true;
      }

    
    
    }, 1000);
    
  }

  applyOpponentDamage(move: any) {
    
    const hitChance = Math.random() * 100;
   
    if (hitChance <= (move.accuracy - this.accuracyDecrease)) {
      const damage = move.power;
      this.playerHP -= damage;
      this.triggerAction("attackedPlayer", move);
      if (this.playerHP < 0) this.playerHP = 0;


      const effectChance = Math.random() * 100;
      
      if (effectChance < move.effectChance) {
        this.applyEffect(move, "playerStatus");
      }

      this.accuracyDecrease = 0;

      this.gameMessage = `Cypher used ${move.name}. It hit!`;
      if (this.playerHP == 0) {
        this.gameMessage = 'Cypher won! You are defeated..';
        this.gameInProgress = false;
      }
    } else {
      this.gameMessage = `Cypher opponent used ${move.name}. It missed!`;
     
    
      this.accuracyDecrease = 0;
    }
  }
  
  tooltipBottom: number = 20;
  showMoveDetails(move: string): void {
    this.moveDetails = this.moveList[move] || {};  
    this.tooltipBottom = 20
    this.showTooltip = true;
  }

  actionDesc: string = "";
 

  showActionDetails(action: string): void {
    this.actionDesc = action;  
    this.showTooltip = true;
      this.tooltipBottom = 0
  }

  hideMoveDetails(): void {
    this.showTooltip = false;
    this.actionDesc = "";  
    this.moveDetails = "";
  }

  boostStamina(): void {
    if (!this.gameInProgress) return;

    if (this.playerStamina < 100) {
    this.playerStamina += 20;
    this.triggerAction("playerCharge", "charge-aura")
    this.gameMessage = `Lafa boosted stamina by 20.`

      this.isPlayerTurn = false;
      this.opponentTurn();

      if (this.paralyzeCount > 0) {
        this.paralyzeCount -= 1;
        this.hitPlayerImageClass = "zap"
  
        setTimeout(() => {
        this.hitPlayerImageClass = ""      
        }, 300);
  
      }
  
      if (this.paralyzeCount <= 0)
        this.playerStatus = '';
  
}
    if (this.playerStamina > 100)
      this.playerStamina = 100;
  }

  heal(): void {
    if (!this.gameInProgress) return;

    if (this.playerHP < 600) {
      let leftoverStamina: number = this.playerHP - (this.playerStamina * 3);

   for (let i = 1; i <= this.playerStamina; i++) {
    
    this.playerHP += 6;
    this.playerStamina--;
    
    if (this.playerHP === 600)
      break;
   }
    //this.triggerAction("playerCharge", "charge-aura")
    this.gameMessage = `Lafa's HP rose by ` + (this.playerStamina * 6);
 
      this.isPlayerTurn = false;
      this.opponentTurn();

      if (this.paralyzeCount > 0) {
        this.paralyzeCount -= 1;
        this.hitPlayerImageClass = "zap"
  
        setTimeout(() => {
        this.hitPlayerImageClass = ""      
        }, 300);
  
      }
  
      if (this.paralyzeCount <= 0)
        this.playerStatus = '';
  
}
    if (this.playerHP > 600)
      this.playerHP = 600;
  }

}
