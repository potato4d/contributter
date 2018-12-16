import { Entity, Column, BaseEntity, PrimaryColumn, OneToMany } from 'typeorm'
import { AppEntity } from './AppEntity'
import { Contribution } from './Contribution'

@Entity('users')
export class User extends AppEntity {
  @PrimaryColumn()
  id: number

  @Column()
  uid: string

  @Column({ name: 'screen_name' })
  screen_name: string

  @Column({ name: 'github_id' })
  github_id: string

  @Column({ name: 'icon_url' })
  icon_url: string

  @Column({ name: 'access_token' })
  access_token: string

  @Column({ name: 'access_secret' })
  access_secret: string

  @Column({ name: 'created_at' })
  created_at: Date

  @Column({ name: 'updated_at' })
  updated_at: Date

  @OneToMany(type => Contribution, contribution => contribution.user)
  contributions: Contribution[]
}
