class Ability {
    public name: string;
    public types: Array<string>;
    public description: string;
    public cooldown: number;
    // Array Format: [Base, Power %]
    public player_knockback: Array<number>;
    public core_knockback: Array<number>;
    public damage: Array<number>;

    public constructor(data: Partial<Ability> = {}) {
        Object.assign(this, data);
    }
}

export class Striker {
    public name: string;
    public stats_tier: number;
    // [<primary>, <secondary>, <ultimate>]
    private abilities: Array<Ability>;
    // awakeningToTier excludes starting Gear.
    private awakeningToTier: { [role: string]: { [awakening: string]: string } };
    private tierToAwakenings: { [role: string]: { [tier: string]: Array<string> } };

    public constructor(data: Partial<Striker> = {}) {
        Object.assign(this, data);
    }

    public change(data: Partial<Striker> = {}) {
        Object.assign(this, data);
    }

    public get_rating(role: string, awakening: string) {
        return this.awakeningToTier[role][awakening];
    }

    public get_tier_items(role: string, tier: string) {
        if (this.tierToAwakenings[role] == null) {
            return null;
        } else {
            return this.tierToAwakenings[role][tier];
        }
    }

    public get_primary() {
        return this.abilities[0];
    }

    public get_secondary() {
        return this.abilities[1];
    }

    public get_ultimate() {
        return this.abilities[2];
    }

    
}