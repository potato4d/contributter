import {
  Entity,
  Column,
  ManyToOne,
  BaseEntity,
  PrimaryColumn,
  JoinColumn
} from 'typeorm'
import { AppEntity } from './AppEntity'
import { User } from './User'

@Entity('contributions')
export class Contribution extends AppEntity {
  @PrimaryColumn()
  id: number

  @ManyToOne(type => User, user => user.contributions)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column()
  count: number

  @Column({ name: 'target_date' })
  target_date: Date

  @Column({ name: 'tweet_url' })
  tweet_url: string

  @Column({ name: 'created_at' })
  created_at: Date

  @Column({ name: 'updated_at' })
  updated_at: Date
}
