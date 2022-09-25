import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";

import { v4 as uuid } from "uuid";
import User from "./User";
import Contact from "./Contact";

@Entity("clients")
class Client {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  username: string;
  @Column()
  email: string;
  @Column()
  phone: string;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  @ManyToOne(() => User, (user) => user.client, { eager: true })
  user: User;
  @OneToMany(() => Contact, (contact) => contact.client)
  contact: Contact[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
export default Client;
