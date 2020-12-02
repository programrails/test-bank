import React from 'react'
export const DocPage = () => {
  return (          
    <main role="main" className="container">
        <div className="jumbotron">
        <h1>API</h1>
        <br/>
        <div>
        <div><b>BASE URL:</b></div>
        <div>http://193.124.114.46:3001/</div>
        </div>

        <div className="my-4">
        <div><b>Create/Register a user</b></div>
        <div><b>POST /users</b></div>
        <div>body:</div>
        <div>&#123;username, password, email&#125;</div>
        <div>returns:</div>
        <div>&#123;id_token&#125;</div>
        <div>errors:</div>
        <div>400: A user with that email already exists</div>
        <div>400: You must send username and password</div>
        </div>

        <div className="my-4">
        <div>example:</div>
        <div>&#123;"username":"John Doo","password":"johnpwd","email":"john@doo.foo"&#125;</div>
        <div>&#123;"id_token":"eyJ0eXAiOiJKV1QiLCJhbG......"&#125;</div>
        </div>

        <div className="my-4">
        <div><b>Login</b></div>
        <div><b>POST /sessions/create</b></div>
        <div>body:</div>
        <div>&#123;email, password&#125;</div>
        <div>returns:</div>
        <div>&#123;id_token&#125;</div>
        <div>errors:</div>
        <div>400: You must send email and password.</div>
        <div>401: Invalid email or password.</div>
        </div>

        <div className="my-4">
        <div><b>List of logged user transactions</b></div>
        <div><b>GET /api/protected/transactions</b></div>
        <div>authentication: bearer</div>
        <div>body:</div>
        <div>returns:</div>
        <div>&#123;trans_token:[&#123;id, date, username, amount, balance&#125;]&#125;</div>
        <div>errors:</div>
        <div>401: UnauthorizedError</div>
        <div>401: Invalid user</div>
        </div>
         
        <div className="my-4">
        <div><b>Create a transaction</b></div>
        <div><b>POST /api/protected/transactions</b></div>
        <div>Sender: logged user</div>
        <div>Recipient: name in a body</div>
        <div>authentication: bearer</div>
        <div>body:</div>
        <div>&#123;name, amount&#125;</div>
        <div>returns:</div>
        <div>&#123;trans_token:&#123;id, date, username, amount, balance&#125;&#125;</div>
        <div>errors:</div>
        <div>400: user not found</div>
        <div>400: balance exceeded</div>
        <div>401: UnauthorizedError</div>
        <div>401: Invalid user</div>
        </div>

        <div className="my-4">
        <div><b>Logged user info</b></div>
        <div><b>GET /api/protected/user-info</b></div>
        <div>authentication: bearer</div>
        <div>body:</div>
        <div>returns: &#123;user_info_token:&#123;id, name, email, balance&#125;&#125;</div>
        <div>errors:</div>
        <div>400: user not found</div>
        <div>401: UnauthorizedError</div>
        <div>401: Invalid user</div>
        </div>

        <div className="my-4">
        <div><b>Filtered User list</b></div>
        <div><b>POST /api/protected/users/list</b></div>
        <div>authentication: bearer</div>
        <div>body:</div>
        <div>&#123;filter&#125;</div>
        <div>returns:</div>
        <div>[&#123;id, name&#125;]</div>
        <div>errors:</div>
        <div>401: UnauthorizedError</div>
        <div>401: Invalid user</div>
        <div>401: No search string</div>
        </div>
      </div>
    </main>
  )
}
