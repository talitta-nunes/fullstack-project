import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";

import { v4 as uuid } from "uuid";
import Client from "./Client";

@Entity("contacts")
class Contact {
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
  @ManyToOne(() => Client, (client) => client.contact, { eager: true })
  client: Client;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
export default Contact;
